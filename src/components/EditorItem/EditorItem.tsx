import { onCleanup } from "solid-js";
import { css } from "solid-styled";
import { calculatePosition, calculateResize } from "~/utilities";

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
      border: 1px solid white;
      user-select: none;
    }

    .item:focus .resizable {
      display: block;
    }

    .resize-top {
      top: -5px;
    }

    .resize-top.resize-left,
    .resize-bottom.resize-right {
      cursor: nwse-resize;
    }

    .resize-top.resize-right,
    .resize-bottom-resize-left {
      cursor: nesw-resize;
    }

    .resize-left {
      left: -5px;
    }

    .resize-bottom {
      bottom: -5px;
    }

    .resize-right {
      right: -5px;
    }
  `;

  // Event handlers
  const handleMouseUp = () => {
    // Find any elements with .draggable
    const draggableItems = document.getElementsByClassName("dragging");
    // Remove all attributes and class from draggable elements
    for (const item of draggableItems) {
      item.classList.remove("dragging");
      item.removeAttribute("data-start-x");
      item.removeAttribute("data-start-y");
      item.removeAttribute("data-element-x");
      item.removeAttribute("data-element-y");
    }

    // Find any elements with .resizing
    const resizableItems = document.getElementsByClassName("resizing");
    // Remove all attributes and class from resizing elements
    for (const item of resizableItems) {
      item.classList.remove("resizing");
      item.removeAttribute("data-resize-handle");
      item.removeAttribute("data-mouse-x");
      item.removeAttribute("data-mouse-y");
      item.removeAttribute("data-initial-width");
      item.removeAttribute("data-initial-height");
      item.removeAttribute("data-initial-x");
      item.removeAttribute("data-initial-y");
    }

    // Remove move events
    document.documentElement.removeEventListener("mousemove", handleMouseMove);
  };

  // Handles translation and resizing calculations while the mouse is moving
  const handleMouseMove = (e: MouseEvent) => {
    // Grab elements for calculations
    const draggableItem: HTMLElement = document.getElementsByClassName(
      "dragging"
    )?.[0] as HTMLElement;
    const container: HTMLElement = document.getElementById(
      "editor-screen"
    ) as HTMLElement;

    if (draggableItem) {
      calculatePosition(e, draggableItem, container);
    }

    const resizingItem: HTMLElement = document.getElementsByClassName(
      "resizing"
    )?.[0] as HTMLElement;

    if (resizingItem) {
      calculateResize(e, resizingItem, container);
    }
  };

  const handleResizeHandleDown = (
    e: MouseEvent,
    handle: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  ) => {
    const resizedElement = (e.currentTarget as HTMLElement).parentElement;
    const resizedElementBox = resizedElement?.getBoundingClientRect();

    resizedElement?.classList.add("resizing");
    resizedElement?.setAttribute("data-resize-handle", handle);
    resizedElement?.setAttribute("data-mouse-x", e.clientX.toString());
    resizedElement?.setAttribute("data-mouse-y", e.clientY.toString());
    resizedElement?.setAttribute(
      "data-initial-width",
      resizedElementBox?.width.toString() ?? ""
    );
    resizedElement?.setAttribute(
      "data-initial-height",
      resizedElementBox?.height.toString() ?? ""
    );
    resizedElement?.setAttribute(
      "data-initial-x",
      resizedElement.style.left.replace("px", "").toString() ?? ""
    );
    resizedElement?.setAttribute(
      "data-initial-y",
      resizedElement.style.top.replace("px", "").toString() ?? ""
    );

    document.documentElement.addEventListener("mousemove", handleMouseMove);
  };

  onCleanup(() => {
    document.documentElement.removeEventListener("mouseup", handleMouseUp);
    document.documentElement.removeEventListener("mousemove", handleMouseMove);
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
        // Grab element being clicked
        const itemTarget = e.currentTarget;
        // Mark item as being dragged
        itemTarget.classList.add("dragging");
        // Set initial mouse position
        itemTarget.setAttribute("data-start-x", e.clientX.toString());
        itemTarget.setAttribute("data-start-y", e.clientY.toString());
        // Set initial element position
        itemTarget.setAttribute(
          "data-element-x",
          itemTarget.style.left.replace("px", "") ?? 0
        );
        itemTarget.setAttribute(
          "data-element-y",
          itemTarget.style.top.replace("px", "") ?? 0
        );
        // Add listener to document so we remove data and classes no matter where user stops clicking
        document.documentElement.addEventListener("mouseup", handleMouseUp);
        // Add listener to document so we move the position no matter where the mouse is
        document.documentElement.addEventListener("mousemove", handleMouseMove);
      }}
    >
      <div
        class="resizable resize-top resize-left"
        onMouseDown={(e) => {
          e.stopPropagation();
          handleResizeHandleDown(e, "top-left");
        }}
      ></div>
      <div
        class="resizable resize-top resize-right"
        onMouseDown={(e) => {
          e.stopPropagation();
          handleResizeHandleDown(e, "top-right");
        }}
      ></div>
      <div
        class="resizable resize-bottom resize-left"
        onMouseDown={(e) => {
          e.stopPropagation();
          handleResizeHandleDown(e, "bottom-left");
        }}
      ></div>
      <div
        class="resizable resize-bottom resize-right"
        onMouseDown={(e) => {
          e.stopPropagation();
          handleResizeHandleDown(e, "bottom-right");
        }}
      ></div>
    </div>
  );
};
