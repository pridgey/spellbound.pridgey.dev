import { css } from "solid-styled";
import { EditorScreen, MapLayers } from "~/components";
import { GameItem } from "~/types";
import mapState from "~/state/mapState";
import { For } from "solid-js";

const Game = () => {
  css`
    main {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      display: grid;
      grid-template-columns: 1fr min-content;
      grid-template-rows: repeat(2, min-content) 1fr;
      grid-template-areas: "title context" "map-tabs side-tabs" "map side";
      gap: 2rem;
      padding: 3rem;
    }

    .temp {
      width: 50px;
      height: 50px;
      border: 1px solid white;
      border-radius: 2rem;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .title {
      grid-area: title;
      color: #fdfcfc;
      font-size: 8rem;
      font-family: Lato, sans-serif;
      border: 0px;
      background: transparent;
      overflow: visible;
    }

    .title:focus {
      outline: 0px;
      border-bottom: 1px solid #fdfcfc;
    }

    .buttonbar {
      grid-area: context;
      display: flex;
      flex-direction: row;
      gap: 0px 2rem;
      align-items: center;
      justify-content: flex-end;
    }

    .map-tabs {
      grid-area: map-tabs;
      display: flex;
      flex-direction: row;
      gap: 0px 2rem;
    }

    .side-tabs {
      grid-area: side-tabs;
      display: flex;
      flex-direction: row;
      gap: 0px 2rem;
    }

    .map-container {
      grid-area: map;
      width: 100%;
      height: 100%;
      border: 1px solid white;
    }

    .sidebar {
      grid-area: side;
      height: 100%;
      width: 100%;
      min-width: 350px;
      border: 1px solid white;
      border-radius: 2rem;
    }
  `;

  const { currentLayers } = mapState;

  return (
    <main>
      <input class="title" placeholder="Game Title" />
      <div class="buttonbar">
        <div class="temp">Publish</div>
        <div class="temp">Save</div>
        <div class="temp">...</div>
      </div>
      <div class="map-tabs">
        <div class="temp">Map 1</div>
        <div class="temp">Map 2</div>
      </div>
      <div class="side-tabs">
        <div class="temp">Map</div>
        <div class="temp">Music</div>
        <div class="temp">Combat</div>
      </div>
      <div class="map-container">
        <EditorScreen MapLayers={currentLayers()} />
      </div>
      <aside class="sidebar">
        <MapLayers />
      </aside>
    </main>
  );
};

export default Game;
