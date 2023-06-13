import { createEffect, createRoot, createSignal } from "solid-js";
import { GameItem } from "~/types";

const createMapState = () => {
  // Selected Layer
  const [selectedLayer, setSelectLayer] = createSignal("");
  // Map Layer State
  const [currentLayers, setCurrentLayers] = createSignal<GameItem[]>([
    {
      Fullscreen: false,
      Height: 200,
      ID: "0",
      ImageURL: "images/sample-1.png",
      Layer: 0,
      Left: 0,
      Rotation: 0,
      Top: 0,
      Width: 200,
    },
    {
      Fullscreen: false,
      Height: 200,
      ID: "1",
      ImageURL: "images/sample-2.png",
      Layer: 1,
      Left: 50,
      Rotation: 0,
      Top: 50,
      Width: 200,
    },
    {
      Fullscreen: false,
      Height: 200,
      ID: "2",
      ImageURL: "images/sample-3.png",
      Layer: 2,
      Left: 100,
      Rotation: 0,
      Top: 100,
      Width: 200,
    },
    {
      Fullscreen: false,
      Height: 200,
      ID: "3",
      ImageURL: "images/sample-4.png",
      Layer: 2,
      Left: 200,
      Rotation: 0,
      Top: 200,
      Width: 200,
    },
  ]);

  // ----- Actions in the store -----

  /**
   * Move a layer up in the array
   * @param layerId The ID of the layer to move up
   */
  const moveLayerUp = (layerId: string) => {
    setCurrentLayers((current) => {
      const layerIndex = current.findIndex((layer) => layer.ID === layerId);

      // Only do so if it isn't the last item in the array
      if (layerIndex < current.length - 1) {
        const hold = current[layerIndex + 1];
        current[layerIndex + 1] = current[layerIndex];
        current[layerIndex] = hold;
      }

      return [...current];
    });
  };

  /**
   * Move a layer down in the array
   * @param layerId The ID of the layer to move down
   */
  const moveLayerDown = (layerId: string) => {
    setCurrentLayers((current) => {
      const layerIndex = current.findIndex((layer) => layer.ID === layerId);

      // Only do so if it isn't the last item in the array
      if (layerIndex > 0) {
        const hold = current[layerIndex - 1];
        current[layerIndex - 1] = current[layerIndex];
        current[layerIndex] = hold;
      }

      return [...current];
    });
  };

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
  return {
    currentLayers,
    getLayer,
    setLayer,
    setLayerByID,
    selectLayer: setSelectLayer,
    selectedLayer,
    moveLayerUp,
    moveLayerDown,
  };
};

export default createRoot(createMapState);
