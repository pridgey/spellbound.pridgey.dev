import { useLocation, useNavigate, useParams } from "@solidjs/router";
import PocketBase from "pocketbase";
import { createSignal, Match, onMount, Switch } from "solid-js";
import styles from "./../styles/table.module.css";
import { generateCode } from "../utilities/generateCode";
import { TableDataProps } from "../types/TableDataProps";

const Table = () => {
  // Create a new PocketBase client
  const client = new PocketBase(import.meta.env.VITE_POCKETBASE_URL ?? "");
  // Collect route parameters
  const params = useParams();
  // Get the navigator
  const navigate = useNavigate();
  // Route location data
  const { state: routerState } = useLocation<Record<"tableRecordId", string>>();

  // Holds the tableData
  const [tableData, setTableData] = createSignal<TableDataProps>();
  // Gets the table code, or generates one if not found
  const code = params.id || generateCode();

  // On mount check if there is a code in the params, if not generate one, then subscribe to data
  onMount(async () => {
    if (!params.id) {
      // Get width and height of window
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Create a new record in the "spellbound" collection
      const tableRecord = await client.collection("spellbound").create({
        table_code: code,
        table_data: JSON.stringify({
          mapUrl: "",
          windowWidth: width,
          windowHeight: height,
        }),
      });
      // Redirect to the new table with code
      navigate(`/table/${code}`, {
        replace: true,
        state: { tableRecordId: tableRecord.id },
      });
    } else {
      if (routerState?.tableRecordId) {
        // Subscribe to this record for updates from the GM
        client
          .collection("spellbound")
          .subscribe(routerState.tableRecordId, (data) => {
            // Update the signal with the new table data
            setTableData(data.record.table_data ?? {});
          });
      }
    }
  });

  return (
    <main class={styles.main}>
      <Switch>
        <Match when={tableData()?.mapUrl?.length}>
          <img
            src={tableData()?.mapUrl}
            alt="Map"
            width={tableData()?.windowWidth}
            height={tableData()?.windowHeight}
            style={{
              "object-fit": "cover",
              "object-position": "center",
            }}
          />
        </Match>
        <Match when={!tableData()?.mapUrl?.length}>
          <h1>{code}</h1>
        </Match>
      </Switch>
    </main>
  );
};

export default Table;
