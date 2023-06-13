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
      Locked: false,
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
      Locked: false,
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
      Locked: false,
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
      Locked: false,
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
      if (!current[layerIndex].Locked && layerIndex < current.length - 1) {
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
      if (!current[layerIndex].Locked && layerIndex > 0) {
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
  const getLayer = (id: string) => {
    const layer = currentLayers().find((layer) => layer.ID === id);

    return layer;
  };

  /**
   * Updates the map layer item in state by ID
   * @param id The id of the map layer item to update
   * @param newValue The new value data for the map layer item
   */
  const setLayerByID = (id: string, newValue: GameItem) => {
    setCurrentLayers((prev) => {
      const layerIndex = prev.findIndex((layer) => layer.ID === id);

      if (!prev[layerIndex].Locked && layerIndex > -1) {
        prev[layerIndex] = {
          ...newValue,
        };
      }

      return [...prev];
    });
  };

  /**
   * Locks a layer of the map to prevent modification
   * @param id The id of the map layer item to lock
   */
  const lockLayer = (id: string) => {
    setCurrentLayers((prev) => {
      const layerIndex = prev.findIndex((layer) => layer.ID === id);

      console.log("Lock layer", { layerIndex });

      prev[layerIndex].Locked = true;

      return [...prev];
    });
  };

  /**
   * Locks a layer of the map to prevent modification
   * @param id The id of the map layer item to lock
   */
  const unlockLayer = (id: string) => {
    setCurrentLayers((prev) => {
      const layerIndex = prev.findIndex((layer) => layer.ID === id);

      prev[layerIndex].Locked = false;

      return [...prev];
    });
  };

  // Return all the stuff from the store
  return {
    currentLayers,
    getLayer,
    lockLayer,
    moveLayerUp,
    moveLayerDown,
    setLayerByID,
    selectLayer: setSelectLayer,
    selectedLayer,
    unlockLayer,
  };
};

export default createRoot(createMapState);
