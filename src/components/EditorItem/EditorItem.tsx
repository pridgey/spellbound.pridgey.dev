import { onCleanup, For } from "solid-js";
import { css } from "solid-styled";
import { useResizable, useTranslatable } from "~/utilities";
import { ResizeHandles } from "~/types";

export type EditorItemProps = {
  Image: string;
};

export const EditorItem = (props: EditorItemProps) => {
  css`
    .resizable {
      display: none;
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background-color: white;
    }

    .item {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 200px;
      height: 200px;
      user-select: none;
      cursor: move;
    }

    .item:focus {
      border: 1px solid white;
    }

    .item:focus .resizable {
      display: block;
    }

    .top-left {
      top: -5px;
      left: -5px;
      cursor: nwse-resize;
    }

    .top-right {
      top: -5px;
      right: -5px;
      cursor: nesw-resize;
    }

    .bottom-left {
      bottom: -5px;
      left: -5px;
      cursor: nesw-resize;
    }

    .bottom-right {
      bottom: -5px;
      right: -5px;
      cursor: nwse-resize;
    }
  `;

  // Hooks
  const { register: registerTranslatable, unregister: unregisterTranslatable } =
    useTranslatable();
  const { register: registerResizable, unregister: unregisterResizable } =
    useResizable();

  onCleanup(() => {
    unregisterTranslatable();
    unregisterResizable();
  });

  return (
    <div
      tabindex={0}
      style={{
        "background-image": `url("${props.Image}")`,
        "background-size": "cover",
      }}
      class="item"
      onmousedown={(e) => {
        // Grab element being clicked and its container
        const itemTarget = e.currentTarget;
        const itemContainer = document.getElementById("editor-screen")!;

        registerTranslatable(itemTarget, itemContainer, e.clientX, e.clientY);
      }}
    >
      <For each={["top-left", "top-right", "bottom-left", "bottom-right"]}>
        {(item) => (
          <div
            class={`resizable ${item}`}
            onMouseDown={(e) => {
              e.stopPropagation();
              const resizedElement = (e.currentTarget as HTMLElement)
                .parentElement!;
              const container = document.getElementById("editor-screen")!;

              registerResizable(
                item as ResizeHandles,
                resizedElement,
                container,
                e.clientX,
                e.clientY
              );
            }}
          ></div>
        )}
      </For>
    </div>
  );
};
