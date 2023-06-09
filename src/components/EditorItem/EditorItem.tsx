import { onCleanup, For, onMount, createEffect } from "solid-js";
import { css } from "solid-styled";
import { useDraggable, useResizable, useRotatable } from "~/utilities";
import { GameItem, ResizeHandles } from "~/types";
import mapState from "~/state/mapState";

export type EditorItemProps = {
  Container: HTMLElement;
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
      width: ${props.Item.Fullscreen ? "100%" : `${props.Item.Width}px`};
      height: ${props.Item.Fullscreen ? "100%" : `${props.Item.Height}px`};
      left: ${props.Item.Fullscreen
        ? "0px"
        : `${props.Item.Left.toString()}px`};
      top: ${props.Item.Fullscreen ? "0px" : `${props.Item.Top.toString()}px`};
      user-select: none;
      cursor: move;
    }

    .item {
      position: absolute;
      width: 100%;
      height: 100%;
      user-select: none;
      cursor: move;
      rotate: ${`${props.Item.Rotation.toString() ?? 0}deg`};
      border: 0px;
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
      z-index: 2;
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
      z-index: 2;
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

  // Current map layer stateful actions
  const { setLayerByID, moveLayerUp, moveLayerDown } = mapState;

  // References to the element and its frame
  let frameRef: HTMLElement;
  let itemRef: HTMLElement;
  let rotationHandleRef: HTMLElement;

  console.log("Render EditorItem:", { props });

  // Draggable Hook
  const { subscribe: subscribeDraggable, unsubscribe: unsubscribeDraggable } =
    useDraggable(frameRef!, props.Container, {
      OnDragEnd: (x, y) => {
        if (x !== props.Item.Left || y !== props.Item.Top) {
          setLayerByID(props.Item.ID, {
            ...props.Item,
            Left: x,
            Top: y,
            Selected: true,
          });
        }
      },
    });

  // Rotatable Hook
  const { subscribe: subscribeRotatable, unsubscribe: unsubscribeRotatable } =
    useRotatable({
      OnRotateEnd: (newRotation) => {
        console.log("OnRotateEnd:", { newRotation });
        if (newRotation !== props.Item.Rotation) {
          setLayerByID(props.Item.ID, {
            ...props.Item,
            Rotation: newRotation,
          });
        }
      },
      ShiftAngleInterval: 15,
    });

  // Item remounts when state updates
  onMount(() => {
    // Subscribe to the draggable hook
    subscribeDraggable(frameRef, props.Container);

    // Subscribe to the rotatable hook
    subscribeRotatable(itemRef, rotationHandleRef);

    // Focus element if selected
    if (props.Item.Selected) {
      itemRef?.focus();
    }

    // const movableEvent = useMoveable(itemRef, props.Container);
    // movableEvent.on("drag", (e) => {
    //   itemRef.style.left = `${e.left}px`;
    //   itemRef.style.top = `${e.top}px`;
    // });
    // movableEvent.on("dragEnd", () => console.log("Drag End"));
  });

  // Item runs cleanup as state updates
  onCleanup(() => {
    // Remove all draggable events
    unsubscribeDraggable();

    // Remove rotation events
    unsubscribeRotatable();

    // // Remove rotate events
    // unsubscribeRotate();
    // unregisterResizable();
  });

  const ItemFrame = (props: any) => (
    <div tabindex={0} class="frame" ref={frameRef! as HTMLDivElement}>
      {props.children}
    </div>
  );

  return (
    <ItemFrame Item={props.Item}>
      <button
        autofocus={props.Item.Selected}
        tabIndex={0}
        style={{
          "background-image": `url("${props.Item.ImageURL}")`,
          "background-size": "cover",
        }}
        class="item"
        ref={itemRef! as HTMLButtonElement}
      ></button>
      {/* Render each of the four scaling handles */}
      <For each={["top-left", "top-right", "bottom-left", "bottom-right"]}>
        {(item) => (
          <div
            class={`resizable ${item}`}
            onMouseDown={(e) => {
              e.stopPropagation();
              const resizedElement = frameRef;
              const container = document.getElementById("editor-screen")!;

              // registerResizable(
              //   item as ResizeHandles,
              //   resizedElement,
              //   container,
              //   e.clientX,
              //   e.clientY
              // );
            }}
          ></div>
        )}
      </For>
      {/* Toolbar of quick actions */}
      <div class="toolbar">
        <button
          onClick={() => {
            // Set layer to full-screen
            setLayerByID(props.Item.ID, {
              ...props.Item,
              Fullscreen: true,
            } as unknown as GameItem);
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
        <button id="layer-down" onClick={() => moveLayerDown(props.Item.ID)}>
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
        <button id="layer-up" onClick={() => moveLayerUp(props.Item.ID)}>
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
        ref={rotationHandleRef! as HTMLDivElement}
        onMouseDown={(e) => {
          e.stopPropagation();
          //subscribeRotate(itemRef);
        }}
      ></div>
    </ItemFrame>
  );
};
