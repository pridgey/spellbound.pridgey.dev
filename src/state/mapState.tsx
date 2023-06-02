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
      Selected: false,
      Top: 0,
      Width: 200,
    },
    {
      Fullscreen: false,
      Height: 200,
      ID: "1",
      ImageURL: "images/joingame.png",
      Layer: 0,
      Left: 0,
      Rotation: 0,
      Selected: false,
      Top: 0,
      Width: 200,
    },
  ]);

  // Actions in the store
  /**
   * Retrieve a specific layer of state by index
   * @param index The index to return
   * @returns The item at the specified index
   */
  const getLayer = (index: number) => currentLayers()[index];

  /**
   * Updates the map layer item in state by index
   * @param index The index of the map layer item to update
   * @param newValue The new value data for the map layer item
   */
  const setLayer = (index: number, newValue: GameItem) => {
    // Update state, use index to find item in array
    setCurrentLayers((prevState) => {
      // Update this index with new value
      prevState[index] = {
        ...newValue,
      };

      return [...prevState];
    });
  };

  /**
   * Updates the map layer item in state by ID
   * @param id The id of the map layer item to update
   * @param newValue The new value data for the map layer item
   */
  const setLayerByID = (id: string, newValue: GameItem) => {
    setCurrentLayers((prev) => {
      const layerIndex = prev.findIndex((layer) => layer.ID === id);

      if (layerIndex > -1) {
        prev[layerIndex] = {
          ...newValue,
        };
      }

      return [...prev];
    });
  };

  // Return all the stuff from the store
  return { currentLayers, getLayer, setLayer, setLayerByID };
};

export default createRoot(createMapState);
