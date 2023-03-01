import { createSignal } from "solid-js";

type TranslatableProps = {
  translateableElement: HTMLElement;
  containerElement: HTMLElement;
  mouseStartX: number;
  mouseStartY: number;
  elementStartX: number;
  elementStartY: number;
};

export const useTranslatable = () => {
  const [translatableElement, setTranslatableElement] =
    createSignal<TranslatableProps>();

  const translate = (event: MouseEvent) => {
    const data = translatableElement();
    if (data?.translateableElement) {
      // Figure out how much the mouse has moved so far
      const mouseOffsetX = event.clientX - data.mouseStartX;
      const mouseOffsetY = event.clientY - data.mouseStartY;

      // Get container's boundaries (calculate this every event in case it changes?)
      const containerBox = data.containerElement.getBoundingClientRect();
      const containerMinimumX = 0;
      const containerMaximumX = containerBox.width ?? 0;
      const containerMinimumY = 0;
      const containerMaximumY = containerBox.height ?? 0;

      // Calculate where the new position of the dragged element will be
      const translatableBox =
        data.translateableElement?.getBoundingClientRect();
      const currentWidth = translatableBox?.width ?? 0;
      const currentHeight = translatableBox?.height ?? 0;
      let newX = data.elementStartX + mouseOffsetX;
      let newY = data.elementStartY + mouseOffsetY;

      // Ensure new position is within container's bounds
      if (newX < containerMinimumX) {
        // Dragged too far left, set it to the min
        newX = containerMinimumX;
      }
      if (newX + currentWidth > containerMaximumX) {
        // Dragged too far right, set it to the max minus the width
        newX = containerMaximumX - currentWidth;
      }
      if (newY < containerMinimumY) {
        // Dragged too far up, set it to the min
        newY = containerMinimumY;
      }
      if (newY + currentHeight > containerMaximumY) {
        // Dragged too far down, set it to the max minus the height
        newY = containerMaximumY - currentHeight;
      }

      // Update the dragged element's left and top positions
      data.translateableElement.style.left = `${newX}px`;
      data.translateableElement.style.top = `${newY}px`;
    }
  };

  const unregister = () => {
    setTranslatableElement();
    document?.documentElement?.removeEventListener("mousemove", translate);
  };

  const register = (
    element: HTMLElement,
    container: HTMLElement,
    mouseStartX: number,
    mouseStartY: number
  ) => {
    // If we don't have these, fail early
    if (!element || !container) {
      return;
    }

    // Calculate initial data
    const elementBox = element.getBoundingClientRect();
    const containerBox = container.getBoundingClientRect();
    const elementStartX = elementBox.left - containerBox.left;
    const elementStartY = elementBox.top - containerBox.top;

    // Save this for use in other functions
    setTranslatableElement({
      translateableElement: element,
      containerElement: container,
      elementStartX,
      elementStartY,
      mouseStartX,
      mouseStartY,
    });

    // Listen to mousemoves for translation
    document?.documentElement?.addEventListener("mousemove", translate);
    // Remove the element no matter where the user let's go
    document?.documentElement?.addEventListener("mouseup", unregister);
  };

  return {
    register,
    unregister,
  };
};
