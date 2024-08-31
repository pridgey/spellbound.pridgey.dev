import { redirect, useLocation, useNavigate, useParams } from "@solidjs/router";
import PocketBase from "pocketbase";
import { createSignal, Match, onMount, Switch } from "solid-js";

const generateRandomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};

const Table = () => {
  // Create a new PocketBase client
  const client = new PocketBase(import.meta.env.VITE_POCKETBASE_URL ?? "");
  // Collect route parameters
  const params = useParams();
  // Get the navigator
  const navigate = useNavigate();
  // Route location data
  const { state: routerState } = useLocation();

  // Holds the tableData
  const [tableData, setTableData] = createSignal<Object>({});
  // Gets the table code, or generates one if not found
  const code = params.id || generateRandomCode();

  // On mount check if there is a code in the params, if not generate one, then subscribe to data
  onMount(async () => {
    if (!params.id) {
      // Create a new record in the "spellbound" collection
      const tableRecord = await client.collection("spellbound").create({
        table_code: code,
        table_data: JSON.stringify({ mapUrl: "" }),
      });
      // Redirect to the new table with code
      navigate(`/table/${code}`, {
        replace: true,
        state: { tableRecordId: tableRecord.id },
      });
    } else {
      // Subscribe to this record for updates from the GM
      client
        .collection("spellbound")
        .subscribe(routerState.tableRecordId, (data) => {
          // Update the signal with the new table data
          setTableData(data.record.table_data ?? {});
        });
    }
  });

  return (
    <div
      style={{
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        height: "100vh",
        "font-size": "3rem",
      }}
    >
      <Switch>
        <Match when={tableData().mapUrl?.length}>
          <img src={tableData().mapUrl} alt="Map" />
        </Match>
        <Match when={!tableData().mapUrl?.length}>
          <h1>{code}</h1>
        </Match>
      </Switch>
    </div>
  );
};

export default Table;
