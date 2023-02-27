import { For, onCleanup } from "solid-js";
import { css } from "solid-styled";
import { calculatePosition } from "~/utilities";

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
  `;

  const items = ["images/creategame.png", "images/joingame.png"];

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

    // Remove move events
    document.documentElement.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (e: MouseEvent) => {
    // Grab elements for calculations
    const itemTarget: HTMLElement = document.getElementsByClassName(
      "dragging"
    )?.[0] as HTMLElement;
    const container: HTMLElement = document.getElementById(
      "editor-screen"
    ) as HTMLElement;

    calculatePosition(e, itemTarget, container);
  };

  onCleanup(() => {
    document.documentElement.removeEventListener("mouseup", handleMouseUp);
    document.documentElement.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <div class="screen" id="editor-screen">
      <For each={items}>
        {(item, index) => (
          <div
            style={{
              background: `hsl(${Math.random() * 360}, 50%, 50%)`,
              "background-image": `url("${item}")`,
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
              document.documentElement.addEventListener(
                "mouseup",
                handleMouseUp
              );
              // Add listener to document so we move the position no matter where the mouse is
              document.documentElement.addEventListener(
                "mousemove",
                handleMouseMove
              );
            }}
          ></div>
        )}
      </For>
    </div>
  );
};
