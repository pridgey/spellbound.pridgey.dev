import {
  AiOutlineCheckCircle,
  AiOutlineDown,
  AiOutlineUp,
} from "solid-icons/ai";
import { For, Show } from "solid-js";
import mapState from "~/state/mapState";
import { GameItem } from "~/types";
import styles from "./MapLayers.module.css";

type MapLayersProps = {
  Layers: Pick<GameItem, "ID">[];
  SelectedLayer: string;
};

export const MapLayers = (props: MapLayersProps) => {
  const { moveLayerDown, moveLayerUp, currentLayers } = mapState;

  return (
    <div class={styles.container}>
      <div class={styles.layersHeader}>
        <h2 class={styles.headerTitle}>Map Layers</h2>
        <button
          style={{ "grid-area": "up" }}
          class={styles.headerButton}
          onClick={() =>
            moveLayerUp(
              currentLayers().find((layer) => layer.Selected)?.ID ?? "-1"
            )
          }
        >
          <AiOutlineUp size={16} fill="white" />
        </button>
        <button
          style={{ "grid-area": "down" }}
          class={styles.headerButton}
          onClick={() =>
            moveLayerDown(
              currentLayers().find((layer) => layer.Selected)?.ID ?? "-1"
            )
          }
        >
          <AiOutlineDown size={16} fill="white" />
        </button>
      </div>
      <div class={styles.layersWrapper}>
        <For each={currentLayers()}>
          {(item) => {
            return (
              <div class={styles.layerItem}>
                <Show when={item.Selected}>
                  <AiOutlineCheckCircle size={18} fill="white" />
                </Show>
                Layer {Number(item.ID) + 1}
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};
