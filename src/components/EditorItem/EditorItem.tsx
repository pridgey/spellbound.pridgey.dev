import { onCleanup, onMount, Switch, Match } from "solid-js";
import { css } from "solid-styled";
import { useDraggable, useResizable, useRotatable } from "~/utilities";
import { GameItem } from "~/types";
import mapState from "~/state/mapState";
import {
  AiOutlineCompress,
  AiOutlineDown,
  AiOutlineExpand,
  AiOutlineUp,
} from "solid-icons/ai";
import { FiRotateCcw } from "solid-icons/fi";

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
      z-index: 2;
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
      z-index: 3;
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
      z-index: 3;
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

    .toolbar_button {
      font-size: 2rem;
    }

    .toolbar > button > svg {
      width: 2rem;
      height: 2rem;
      font-size: 2rem;
    }

    /* The hover effect of the toolbar's buttons */
    .toolbar button:hover {
      background-color: #ecebeb;
    }

    .selection {
      display: none;
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      border: 1px dashed white;
      z-index: 2;
      user-select: none;
    }

    /* Removes the outline that comes from holding shift */
    .frame:focus-visible,
    .item:focus-visible {
      outline: 0px;
    }

    /* Shows a border around the item frame */
    .frame:focus-within {
      border: 0px solid white;
      outline: 0px;
    }

    /* Show toolbar when item frame is focused */
    .frame:focus-within .toolbar {
      display: flex;
    }

    /* Show scale handles and rotation handle when item frame is focused */
    .frame:focus-within .resizable,
    .frame:focus-within .rotation,
    .frame:focus-within .selection {
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
  let resizeTLRef: HTMLDivElement;
  let resizeTRRef: HTMLDivElement;
  let resizeBLRef: HTMLDivElement;
  let resizeBRRef: HTMLDivElement;

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

  // Resizable Hook
  const { subscribe: subscribeResizable, unsubscribe: unsubscribeResizable } =
    useResizable({
      OnResizeEnd: (width, height, left, top) => {
        setLayerByID(props.Item.ID, {
          ...props.Item,
          Left: left,
          Top: top,
          Width: width,
          Height: height,
        });
      },
      MinimumSize: 100,
    });

  // Item remounts when state updates
  onMount(() => {
    // Subscribe to the draggable hook
    subscribeDraggable(frameRef, props.Container);

    // Subscribe to the rotatable hook
    subscribeRotatable(itemRef, rotationHandleRef);

    // Subscribe to the resize handles
    subscribeResizable(
      frameRef,
      props.Container,
      resizeTLRef,
      resizeTRRef,
      resizeBLRef,
      resizeBRRef
    );

    // Focus element if selected
    if (props.Item.Selected) {
      itemRef?.focus();
    }
  });

  // Item runs cleanup as state updates
  onCleanup(() => {
    // Remove all draggable events
    unsubscribeDraggable();

    // Remove rotation events
    unsubscribeRotatable();

    // Remove resize events
    unsubscribeResizable();
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
      <div ref={resizeTLRef!} class="resizable top-left"></div>
      <div ref={resizeTRRef!} class="resizable top-right"></div>
      <div ref={resizeBLRef!} class="resizable bottom-left"></div>
      <div ref={resizeBRRef!} class="resizable bottom-right"></div>

      {/* Toolbar of quick actions */}
      <div class="toolbar">
        <button
          id="full-screen"
          onClick={() => {
            // Set layer to full-screen
            setLayerByID(props.Item.ID, {
              ...props.Item,
              Fullscreen: !props.Item.Fullscreen,
            } as unknown as GameItem);
          }}
        >
          <Switch>
            <Match when={props.Item.Fullscreen}>
              <AiOutlineCompress size={12} />
            </Match>
            <Match when={!props.Item.Fullscreen}>
              <AiOutlineExpand size={12} />
            </Match>
          </Switch>
        </button>
        <button id="layer-down" onClick={() => moveLayerDown(props.Item.ID)}>
          <AiOutlineDown size={12} />
        </button>
        <button id="layer-up" onClick={() => moveLayerUp(props.Item.ID)}>
          <AiOutlineUp size={12} />
        </button>
      </div>
      {/* Icon handle for rotating the item */}
      <div class="rotation" ref={rotationHandleRef! as HTMLDivElement}></div>
      {/* The outline around the frame when selected, shows through layers above */}
      <div class="selection"></div>
    </ItemFrame>
  );
};
