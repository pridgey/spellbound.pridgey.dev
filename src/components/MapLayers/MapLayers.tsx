import { For } from "solid-js";
import { GameItem } from "~/types";
import mapState from "~/state/mapState";

type MapLayersProps = {
  Layers: Pick<GameItem, "ID">[];
};

export const MapLayers = (props: MapLayersProps) => {
  const { moveLayerDown, moveLayerUp } = mapState;

  return (
    <div style={{ display: "flex", "flex-direction": "column", gap: "1rem" }}>
      <For each={props.Layers}>
        {(item) => {
          return (
            <div
              style={{
                display: "flex",
                "flex-direction": "row",
                gap: "0.5rem",
              }}
            >
              <span style={{ color: "white", "font-size": "1.5rem" }}>
                Layer {Number(item.ID) + 1}
              </span>
              <button
                style={{
                  color: "white",
                  "font-size": "1.5rem",
                  background: "transparent",
                  border: "0px",
                }}
                onClick={() => moveLayerUp(item.ID)}
              >
                Up
              </button>
              <button
                style={{
                  color: "white",
                  "font-size": "1.5rem",
                  background: "transparent",
                  border: "0px",
                }}
                onClick={() => moveLayerDown(item.ID)}
              >
                Down
              </button>
            </div>
          );
        }}
      </For>
    </div>
  );
};
