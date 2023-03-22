import { createEffect, createRoot, createSignal } from "solid-js";
import { GameItem } from "~/types";

const createMapState = () => {
  // Map Layer State
  const [currentLayers, setCurrentLayers] = createSignal<GameItem[]>([
    {
      Fullscreen: false,
      Height: 200,
      ID: "0",
      ImageURL: "images/creategame.png",
      Layer: 0,
      Left: 0,
      Rotation: 0,
      Top: 0,
      Width: 200,
    },
  ]);

  // Actions in the store
  const getLayer = (index: number) => currentLayers()[index];
  const setLayer = (index: number, layerValue: GameItem) => {
    setCurrentLayers((prev) => {
      console.log({ prev, index, layer: prev[index], layerValue });
      prev[index] = {
        ...layerValue,
      };

      return [...prev];
    });
  };
  const setLayerByID = (id: string, layerValue: GameItem) => {
    setCurrentLayers((prev) => {
      const layerIndex = prev.findIndex((layer) => layer.ID === id);

      if (layerIndex > -1) {
        prev[layerIndex] = {
          ...layerValue,
        };
      }

      return [...prev];
    });
  };

  // Return all the stuff from the store
  return { currentLayers, getLayer, setLayer, setLayerByID };
};

export default createRoot(createMapState);
