import { atom } from "solid-jotai";
import { GameItem } from "~/types";

// Might want to fetch this on load?
export const mapLayersAtom = atom<GameItem[]>([
  {
    Height: 200,
    Fullscreen: false,
    ImageURL: "images/creategame.png",
    Layer: 0,
    Left: 0,
    Rotation: 0,
    Top: 0,
    Width: 200,
  },
]);

const setMapLayer = atom(
  (get) => get(mapLayersAtom),
  (get, set, layerUpdate) => {
    const mapLayers = get(mapLayersAtom);
    const layer = mapLayers.find((layer) => layer.id === layerUpdate.id);
    if (layer) {
    }
  }
);
