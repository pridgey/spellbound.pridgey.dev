import { onCleanup, onMount, Switch, Match, createMemo } from "solid-js";
import { useDraggable, useResizable, useRotatable } from "~/utilities";
import { GameItem } from "~/types";
import mapState from "~/state/mapState";
import {
  AiOutlineCompress,
  AiOutlineDown,
  AiOutlineExpand,
  AiOutlineUp,
} from "solid-icons/ai";
import styles from "./EditorItem.module.css";

export type EditorItemProps = {
  Container: HTMLElement;
  Item: GameItem;
};

export const EditorItem = (props: EditorItemProps) => {
  // Current map layer stateful actions
  const {
    selectedLayer,
    setLayerByID,
    moveLayerUp,
    moveLayerDown,
    selectLayer,
  } = mapState;

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
          selectLayer(props.Item.ID);
          setLayerByID(props.Item.ID, {
            ...props.Item,
            Left: x,
            Top: y,
          });
        }
      },
    });

  // Rotatable Hook
  const { subscribe: subscribeRotatable, unsubscribe: unsubscribeRotatable } =
    useRotatable({
      OnRotateEnd: (newRotation) => {
        if (newRotation !== props.Item.Rotation) {
          selectLayer(props.Item.ID);
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
        selectLayer(props.Item.ID);
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
    if (props.Item.ID === selectedLayer()) {
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
    <div
      tabindex={0}
      onMouseDown={(e) => {
        e.stopPropagation();
        selectLayer(props.Item.ID);
      }}
      onClick={(e) => e.stopPropagation()}
      class={styles.frame}
      style={{
        "--frame-width": props.Item.Fullscreen
          ? "100%"
          : `${props.Item.Width}px`,
        "--frame-height": props.Item.Fullscreen
          ? "100%"
          : `${props.Item.Height}px`,
        "--frame-left": props.Item.Fullscreen ? "0px" : `${props.Item.Left}px`,
        "--frame-top": props.Item.Fullscreen ? "0px" : `${props.Item.Top}px`,
      }}
      ref={frameRef! as HTMLDivElement}
    >
      {props.children}
    </div>
  );

  // Returns the value for the CSS Display property depending on if element is considered selected
  const selectedDisplayProperty = createMemo(() =>
    props.Item.ID === selectedLayer() ? "block" : "none"
  );
  const toolbarDisplayProperty = createMemo(() =>
    props.Item.ID === selectedLayer() ? "flex" : "none"
  );

  return (
    <ItemFrame Item={props.Item}>
      <button
        autofocus={props.Item.ID === selectedLayer()}
        tabIndex={0}
        style={{
          "background-image": `url("${props.Item.ImageURL}")`,
          "background-size": "cover",
          "--item-rotate": `${props.Item.Rotation ?? "0"}deg`,
        }}
        class={styles.item}
        ref={itemRef! as HTMLButtonElement}
      ></button>
      {/* Render each of the four scaling handles */}
      <div
        ref={resizeTLRef!}
        classList={{
          [styles.resizable]: true,
          [styles.topLeft]: true,
        }}
        style={{
          "--resize-display": selectedDisplayProperty(),
        }}
      ></div>
      <div
        ref={resizeTRRef!}
        classList={{
          [styles.resizable]: true,
          [styles.topRight]: true,
        }}
        style={{
          "--resize-display": selectedDisplayProperty(),
        }}
      ></div>
      <div
        ref={resizeBLRef!}
        classList={{
          [styles.resizable]: true,
          [styles.bottomLeft]: true,
        }}
        style={{
          "--resize-display": selectedDisplayProperty(),
        }}
      ></div>
      <div
        ref={resizeBRRef!}
        classList={{
          [styles.resizable]: true,
          [styles.bottomRight]: true,
        }}
        style={{
          "--resize-display": selectedDisplayProperty(),
        }}
      ></div>

      {/* Toolbar of quick actions */}
      <div
        class={styles.toolbar}
        style={{ "--toolbar-display": toolbarDisplayProperty() }}
      >
        <button
          id="full-screen"
          onClick={() => {
            // Set layer to full-screen
            setLayerByID(props.Item.ID, {
              ...props.Item,
              Fullscreen: !props.Item.Fullscreen,
            });
            selectLayer(props.Item.ID);
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
        <button
          id="layer-down"
          onClick={() => {
            moveLayerDown(props.Item.ID);
            selectLayer(props.Item.ID);
          }}
        >
          <AiOutlineDown size={12} />
        </button>
        <button
          id="layer-up"
          onClick={() => {
            moveLayerUp(props.Item.ID);
            selectLayer(props.Item.ID);
          }}
        >
          <AiOutlineUp size={12} />
        </button>
      </div>
      {/* Icon handle for rotating the item */}
      <div
        class={styles.rotation}
        ref={rotationHandleRef! as HTMLDivElement}
        style={{
          "--rotate-display": selectedDisplayProperty(),
        }}
      ></div>
      {/* The outline around the frame when selected, shows through layers above */}
      <div
        class={styles.selection}
        style={{
          "--selection-display": selectedDisplayProperty(),
        }}
      ></div>
    </ItemFrame>
  );
};
