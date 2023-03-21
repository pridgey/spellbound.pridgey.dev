import { onCleanup, For } from "solid-js";
import { css } from "solid-styled";
import { useResizable, useRotatable, useTranslatable } from "~/utilities";
import { GameItem, ResizeHandles } from "~/types";
import mapState from "~/state/mapState";

export type EditorItemProps = {
  Item: GameItem;
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
      user-select: none;
    }

    .frame {
      position: absolute;
      width: ${`${props.Item.Width.toString()}${
        props.Item.Width.toString().includes("%") ? "" : "px"
      }`};
      height: ${`${props.Item.Height.toString()}${
        props.Item.Height.toString().includes("%") ? "" : "px"
      }`};
      user-select: none;
      cursor: move;
    }

    .item {
      position: absolute;
      left: ${`${props.Item.Left.toString()}px`};
      top: ${`${props.Item.Top.toString()}px`};
      width: 100%;
      height: 100%;
      user-select: none;
      cursor: move;
    }

    .rotation {
      display: none;
      position: absolute;
      width: 30px;
      height: 30px;
      background-color: white;
      bottom: 20px;
      right: 20px;
      background-image: url("/images/rotate.svg");
      background-size: 50%;
      background-position: center;
      border-radius: 100%;
      background-repeat: no-repeat;
      cursor: url("/images/rotate.svg"), auto;
    }

    /* Toolbar styling */
    .toolbar {
      display: none;
      position: absolute;
      height: 30px;
      background-color: white;
      bottom: 20px;
      right: 70px;
      flex-direction: row;
      border-radius: 2rem;
      overflow: hidden;
    }

    /* Toolbar button styling */
    .toolbar button {
      width: 30px;
      border: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: white;
      color: black;
    }

    .toolbar button svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    /* The hover effect of the toolbar's buttons */
    .toolbar button:hover {
      background-color: #ecebeb;
    }

    /* Removes the outline that comes from holding shift */
    .frame:focus-visible,
    .item:focus-visible {
      outline: 0px;
    }

    /* Shows a border around the item frame */
    .frame:focus-within {
      border: 1px solid white;
      outline: 0px;
    }

    /* Show toolbar when item frame is focused */
    .frame:focus-within .toolbar {
      display: flex;
    }

    /* Show scale handles and rotation handle when item frame is focused */
    .frame:focus-within .resizable,
    .frame:focus-within .rotation {
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

  // Transformation hooks
  const { register: registerTranslatable, unregister: unregisterTranslatable } =
    useTranslatable();
  const { register: registerResizable, unregister: unregisterResizable } =
    useResizable();
  const { register: registerRotatable, unregister: unregisterRotatable } =
    useRotatable();

  onCleanup(() => {
    unregisterTranslatable();
    unregisterResizable();
    unregisterRotatable();
  });

  let frameRef: HTMLElement;
  let itemRef: HTMLElement;

  const { currentLayers, setLayer } = mapState;

  return (
    <div
      tabindex={0}
      class="frame"
      ref={frameRef! as HTMLDivElement}
      onmousedown={(e) => {
        // Grab element being clicked and its container
        const itemTarget = e.currentTarget;
        const itemContainer = document.getElementById("editor-screen")!;

        registerTranslatable(itemTarget, itemContainer, e.clientX, e.clientY);
      }}
    >
      <div
        style={{
          "background-image": `url("${props.Item.ImageURL}")`,
          "background-size": "cover",
        }}
        class="item"
        ref={itemRef! as HTMLDivElement}
      ></div>
      {/* Render each of the four scaling handles */}
      <For each={["top-left", "top-right", "bottom-left", "bottom-right"]}>
        {(item) => (
          <div
            class={`resizable ${item}`}
            onMouseDown={(e) => {
              e.stopPropagation();
              const resizedElement = frameRef;
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
      {/* Toolbar of quick actions */}
      <div class="toolbar">
        <button
          onClick={() => {
            setLayer(0, {
              ...currentLayers()[0],
              Height: "100%",
              Left: 0,
              Top: 0,
              Width: "100%",
            } as unknown as GameItem);
            // frameRef.style.setProperty("height", "100%");
            // frameRef.style.setProperty("width", "100%");
            // frameRef.style.setProperty("left", "0px");
            // frameRef.style.setProperty("top", "0px");
          }}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="#000"
              stroke-width="2"
              d="M10,14 L2,22 M1,15 L1,23 L9,23 M22,2 L14,10 M15,1 L23,1 L23,9"
            ></path>
          </svg>
        </button>
        <button>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              fill="none"
              stroke="#000"
              stroke-width="2"
              points="18 9 12 15 6 9"
            ></polyline>
          </svg>
        </button>
        <button
          onClick={() => {
            const zindex = Number(
              frameRef.style.getPropertyValue("z-index") || "0"
            );

            frameRef.style.setProperty("z-index", `${zindex + 1}`);
          }}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              fill="none"
              stroke="#000"
              stroke-width="2"
              points="18 9 12 15 6 9"
              transform="matrix(1 0 0 -1 0 24)"
            ></polyline>
          </svg>
        </button>
      </div>
      {/* Icon handle for rotating the item */}
      <div
        class="rotation"
        onMouseDown={(e) => {
          e.stopPropagation();
          registerRotatable(itemRef, e.clientX, e.clientY);
        }}
      ></div>
    </div>
  );
};
