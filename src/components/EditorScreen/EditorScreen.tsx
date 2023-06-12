import { For, createEffect } from "solid-js";
import { css } from "solid-styled";
import { EditorItem } from "../EditorItem";
import { GameItem } from "~/types";
import mapState from "~/state/mapState";

type EditorScreenProps = {
  MapLayers: GameItem[];
};

export const EditorScreen = (props: EditorScreenProps) => {
  css`
    .screen {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .item {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 200px;
      height: 200px;
      border: 1px solid white;
      user-select: none;
    }

    .item:focus::before {
      content: "";
      position: absolute;
      width: calc(100% + 4rem);
      height: calc(100% + 4rem);
      top: -2rem;
      left: -2rem;
      border: 2px solid tomato;
    }
  `;

  let ContainerRef: HTMLDivElement;

  const { currentLayers, selectLayer } = mapState;

  return (
    <div
      class="screen"
      id="editor-screen"
      ref={ContainerRef! as HTMLDivElement}
      onClick={() => selectLayer("")}
    >
      <For each={currentLayers()}>
        {(item) => <EditorItem Container={ContainerRef} Item={item} />}
      </For>
    </div>
  );
};
