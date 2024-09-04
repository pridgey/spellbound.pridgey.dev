import { useNavigate, useParams } from "@solidjs/router";
import PocketBase from "pocketbase";
import { TableDataProps } from "../types/TableDataProps";
import { createSignal, onMount } from "solid-js";
import styles from "./../styles/gm.module.css";

const GM = () => {
  // Create a new PocketBase client
  const client = new PocketBase(import.meta.env.VITE_POCKETBASE_URL ?? "");
  // Collect route parameters
  const params = useParams();
  const navigate = useNavigate();

  if (!params.id) {
    navigate("/", { replace: true });
  }

  const [tableData, setTableData] = createSignal<TableDataProps>();

  onMount(async () => {
    if (params.id) {
      const tableRecord = await client
        .collection("spellbound")
        .getFirstListItem(`table_code = "${params.id}"`);

      setTableData({
        ...tableRecord.table_data,
        id: tableRecord.id,
      });

      client.collection("spellbound").subscribe(tableRecord.id, (data) => {
        setTableData(data.record.table_data ?? {});
      });
    }
  });

  return (
    <main class={styles.main}>
      <h1>Game Master View ({params.id})</h1>
      <input
        type="text"
        onChange={(e) => {
          setTableData({
            ...tableData(),
            mapUrl: e.target.value,
          });
        }}
        placeholder="Map URL"
        style={{ width: "100%" }}
      />
      <button
        onClick={() => {
          console.log("table data", { ...tableData() });
          client.collection("spellbound").update(tableData()?.id ?? "", {
            table_data: JSON.stringify({
              ...tableData(),
            }),
          });
        }}
      >
        Update Table
      </button>
      <div
        class={styles.table}
        style={{
          "--table-map": `url(${tableData()?.mapUrl})`,
          "--table-ratio": `${tableData()?.windowWidth ?? 2} / ${
            tableData()?.windowHeight ?? 1
          }`,
        }}
      ></div>
    </main>
  );
};

export default GM;
