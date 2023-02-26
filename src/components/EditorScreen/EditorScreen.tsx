import { For } from "solid-js";
import { css } from "solid-styled";

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

  const items = [1, 2];

  return (
    <div class="screen" id="editor-screen">
      <For each={items}>
        {(item, index) => (
          <div
            class="item"
            onmousedown={(e) => {
              const itemTarget = e.currentTarget;
              // Mark item as being dragged
              itemTarget.classList.add("dragging");
              // Set initial mouse position
              itemTarget.setAttribute("data-start-x", e.clientX.toString());
              itemTarget.setAttribute("data-start-y", e.clientY.toString());
              itemTarget.setAttribute(
                "data-element-x",
                itemTarget.style.left.replace("px", "") ?? 0
              );
              itemTarget.setAttribute(
                "data-element-y",
                itemTarget.style.top.replace("px", "") ?? 0
              );
            }}
            onmousemove={(e) => {
              const itemTarget = e.currentTarget;

              /* Calculates the distance the mouse has moved
                and applies that amount to the element's initial position

                Also respects the current bounds of the container
              */
              if (itemTarget.classList.contains("dragging")) {
                // Element's initial position
                const elementInitialX =
                  Number(itemTarget.getAttribute("data-element-x")) ?? 0;
                const elementInitialY =
                  Number(itemTarget.getAttribute("data-element-y")) ?? 0;

                // Get how much mouse has moved
                const mouseOffsetX =
                  e.clientX - Number(itemTarget.getAttribute("data-start-x"));
                const mouseOffsetY =
                  e.clientY - Number(itemTarget.getAttribute("data-start-y"));

                // Gets windows maximum bounds
                const screen = document
                  .getElementById("editor-screen")
                  ?.getBoundingClientRect();
                const itemBox = itemTarget.getBoundingClientRect();
                const screenMaxX =
                  (screen?.x ?? 0) +
                  (screen?.width ?? 0) +
                  (itemBox.width ?? 0);
                const screenMaxY =
                  (screen?.y ?? 0) +
                  (screen?.height ?? 0) +
                  (itemBox.height ?? 0);

                // Move element to same distance the mouse has moved
                // might need to do some checks here that the new position isn't outside the container's boundaries
                itemTarget.style.left = `${Math.min(
                  screenMaxX,
                  Math.max(0, elementInitialX + mouseOffsetX)
                )}px`;
                itemTarget.style.top = `${Math.min(
                  screenMaxY,
                  Math.max(0, elementInitialY + mouseOffsetY)
                )}px`;
              }
            }}
            onmouseleave={(e) => {
              const itemTarget = e.currentTarget;
              itemTarget.classList.remove("dragging");
              itemTarget.removeAttribute("data-start-x");
              itemTarget.removeAttribute("data-start-y");
              itemTarget.removeAttribute("data-element-x");
              itemTarget.removeAttribute("data-element-y");
            }}
            onmouseup={(e) => {
              const itemTarget = e.currentTarget;
              itemTarget.classList.remove("dragging");
              itemTarget.removeAttribute("data-start-x");
              itemTarget.removeAttribute("data-start-y");
              itemTarget.removeAttribute("data-element-x");
              itemTarget.removeAttribute("data-element-y");
            }}
          >
            {item}
          </div>
        )}
      </For>
    </div>
  );
};
