import {
  AiOutlineCheckCircle,
  AiOutlineDown,
  AiOutlineUp,
} from "solid-icons/ai";
import { For, Show } from "solid-js";
import mapState from "~/state/mapState";
import { GameItem } from "~/types";
import styles from "./MapLayers.module.css";

export const MapLayers = () => {
  const {
    moveLayerDown,
    moveLayerUp,
    currentLayers,
    selectedLayer,
    selectLayer,
  } = mapState;

  return (
    <div class={styles.container}>
      <div class={styles.layersHeader}>
        <h2 class={styles.headerTitle}>Map Layers</h2>
        <button
          style={{ "grid-area": "up" }}
          class={styles.headerButton}
          onClick={() => {
            const currentSelectedLayer = selectedLayer();
            moveLayerUp(currentSelectedLayer);
            selectLayer(currentSelectedLayer);
          }}
        >
          <AiOutlineUp size={16} fill="white" />
        </button>
        <button
          style={{ "grid-area": "down" }}
          class={styles.headerButton}
          onClick={() => {
            const currentSelectedLayer = selectedLayer();
            moveLayerDown(currentSelectedLayer);
            selectLayer(currentSelectedLayer);
          }}
        >
          <AiOutlineDown size={16} fill="white" />
        </button>
      </div>
      <div class={styles.layersWrapper}>
        <For each={[...currentLayers()].reverse()}>
          {(item) => {
            return (
              <div class={styles.layerItem}>
                <Show when={item.ID === selectedLayer()}>
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
