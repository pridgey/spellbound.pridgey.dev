import { createSignal } from "solid-js";
import { ResizeHandles } from "~/types";

type ResizableProps = {
  handle: ResizeHandles;
  resizableElement: HTMLElement;
  containerElement: HTMLElement;
  mouseStartX: number;
  mouseStartY: number;
  elementStartX: number;
  elementStartY: number;
  elementStartWidth: number;
  elementStartHeight: number;
};

export const useResizable = () => {
  const [resizableElement, setResizableElement] =
    createSignal<ResizableProps>();

  // The minimum size for scaling
  const minimumDimension = 100;

  const resize = (event: MouseEvent) => {
    const data = resizableElement();
    if (data?.containerElement) {
      // Current size of the element
      const resizedElementBox = data.resizableElement.getBoundingClientRect();

      // Current position of the mouse
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // The container boundaries
      const containerMinimumX = 0;
      const containerMinimumY = 0;
      const containerBox = data.containerElement.getBoundingClientRect();
      const containerMaximumX = containerBox.width;
      const containerMaximumY = containerBox.height;

      switch (data.handle) {
        case "top-left":
          // Calculate new dimensions and set element styles
          let topLeftWidth =
            data.elementStartWidth - (mouseX - data.mouseStartX);
          // Calculate height
          let topLeftHeight =
            data.elementStartHeight - (mouseY - data.mouseStartY);
          // Calculate Left position
          let topLeftX = data.elementStartX + (mouseX - data.mouseStartX);
          // Calculate Top position
          let topLeftY = data.elementStartY + (mouseY - data.mouseStartY);

          // Minimum size for scaling
          if (topLeftWidth < minimumDimension) {
            topLeftWidth = minimumDimension;
          }
          // Element width shouldn't be more than container width
          if (topLeftWidth > containerMaximumX) {
            topLeftWidth = containerMaximumX;
          }
          // Set Width (if we are still within container boundaries)
          if (topLeftX > containerMinimumX) {
            data.resizableElement.style.width = `${topLeftWidth}px`;
          }

          // Minimum size for scaling
          if (topLeftHeight < minimumDimension) {
            topLeftHeight = minimumDimension;
          }
          // Element height shouldn't be more than container height
          if (topLeftHeight > containerMaximumY) {
            topLeftHeight = containerMaximumY;
          }
          // Set Height (if we are still within container boundaries)
          if (topLeftY > containerMinimumY) {
            data.resizableElement.style.height = `${topLeftHeight}px`;
          }

          // Don't scale beyond boundaries
          if (topLeftX < containerMinimumX) {
            topLeftX = containerMinimumX;
          }
          // If we hit minimum width, don't push left
          if (topLeftWidth > minimumDimension) {
            data.resizableElement.style.left = `${topLeftX}px`;
          }
          // Don't scale beyond boundaries
          if (topLeftY < containerMinimumY) {
            topLeftY = containerMinimumY;
          }
          // If we hit m inimum height, don't push down
          if (topLeftHeight > minimumDimension) {
            data.resizableElement.style.top = `${topLeftY}px`;
          }
          break;
        case "top-right":
          // Calculate new dimensions and set element styles
          let topRightWidth =
            data.elementStartWidth + (mouseX - data.mouseStartX);
          let topRightHeight =
            data.elementStartHeight - (mouseY - data.mouseStartY);
          let topRightY = data.elementStartY + (mouseY - data.mouseStartY);

          if (topRightWidth + data.elementStartX > containerMaximumX) {
            topRightWidth = containerMaximumX - data.elementStartX;
          }
          if (topRightWidth < minimumDimension) {
            topRightWidth = minimumDimension;
          }
          if (topRightHeight < minimumDimension) {
            topRightHeight = minimumDimension;
          }
          if (topRightY < containerMinimumY) {
            topRightY = containerMinimumY;
          }

          data.resizableElement.style.width = `${topRightWidth}px`;
          if (topRightY > containerMinimumY) {
            data.resizableElement.style.height = `${topRightHeight}px`;
          }
          if (topRightHeight > minimumDimension) {
            data.resizableElement.style.top = `${topRightY}px`;
          }
          break;
        case "bottom-left":
          // Calculate new dimensions and set element styles
          let bottomLeftWidth =
            data.elementStartWidth - (mouseX - data.mouseStartX);
          let bottomLeftHeight =
            data.elementStartHeight + (mouseY - data.mouseStartY);
          let bottomLeftX = data.elementStartX + (mouseX - data.mouseStartX);

          if (bottomLeftWidth < minimumDimension) {
            bottomLeftWidth = minimumDimension;
          }
          if (bottomLeftHeight < minimumDimension) {
            bottomLeftHeight = minimumDimension;
          }
          if (bottomLeftX < containerMinimumX) {
            bottomLeftX = containerMinimumX;
          }
          if (bottomLeftHeight + data.elementStartY > containerMaximumY) {
            bottomLeftHeight = containerMaximumY - data.elementStartY;
          }

          if (bottomLeftX > containerMinimumX) {
            data.resizableElement.style.width = `${bottomLeftWidth}px`;
          }
          data.resizableElement.style.height = `${bottomLeftHeight}px`;
          if (bottomLeftWidth > minimumDimension) {
            data.resizableElement.style.left = `${bottomLeftX}px`;
          }
          break;
        case "bottom-right":
          // Calculate new dimensions and set element styles
          let bottomRightWidth =
            data.elementStartWidth + (mouseX - data.mouseStartX);
          let bottomRightHeight =
            data.elementStartHeight + (mouseY - data.mouseStartY);

          if (bottomRightWidth + data.elementStartX > containerMaximumX) {
            bottomRightWidth = containerMaximumX - data.elementStartX;
          }

          if (bottomRightWidth < minimumDimension) {
            bottomRightWidth = minimumDimension;
          }

          if (bottomRightHeight < minimumDimension) {
            bottomRightHeight = minimumDimension;
          }

          if (bottomRightHeight + data.elementStartY > containerMaximumY) {
            bottomRightHeight = containerMaximumY - data.elementStartY;
          }

          data.resizableElement.style.width = `${bottomRightWidth}px`;
          data.resizableElement.style.height = `${bottomRightHeight}px`;
          break;
      }
    }
  };

  const unregister = () => {
    setResizableElement();
    document?.documentElement?.removeEventListener("mousemove", resize);
  };

  const register = (
    handle: ResizeHandles,
    element: HTMLElement,
    container: HTMLElement,
    mouseStartX: number,
    mouseStartY: number
  ) => {
    if (!element || !container || !handle) {
      return;
    }

    const elementBox = element.getBoundingClientRect();
    const containerBox = container.getBoundingClientRect();

    const elementStartX = elementBox.left - containerBox.left;
    const elementStartY = elementBox.top - containerBox.top;
    const elementStartWidth = elementBox.width;
    const elementStartHeight = elementBox.height;

    setResizableElement({
      handle,
      resizableElement: element,
      containerElement: container,
      mouseStartX,
      mouseStartY,
      elementStartX,
      elementStartY,
      elementStartWidth,
      elementStartHeight,
    });

    document?.documentElement?.addEventListener("mousemove", resize);
    document?.documentElement?.addEventListener("mouseup", unregister);
  };

  return {
    register,
    unregister,
  };
};
