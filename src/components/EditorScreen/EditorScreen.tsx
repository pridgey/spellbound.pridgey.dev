import { For } from "solid-js";
import { css } from "solid-styled";
import { EditorItem } from "../EditorItem";

export const EditorScreen = () => {
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

  const items = ["images/creategame.png", "images/joingame.png"];

  return (
    <div class="screen" id="editor-screen">
      <For each={items}>{(item) => <EditorItem Image={item} />}</For>
    </div>
  );
};
