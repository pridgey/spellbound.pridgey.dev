import { createSignal } from "solid-js";

type useDraggableProps = {
  OnDragEnd?: (x: number, y: number) => void;
};

export const useDraggable = (
  draggableElement: HTMLElement,
  containerElement: HTMLElement,
  options?: useDraggableProps
) => {
  // Current mouse position
  const [pos, setPos] = createSignal({ x: 0, y: 0 });

  /* ----- Initialization ----- */
  // The actual element being dragged
  let element = draggableElement;

  // Controls if we are in a dragging state
  let dragging = false;

  // Offset from the document window
  let offset = { x: 0, y: 0 };

  // item bounds
  const initializeItemBounds = (newItemElement: HTMLElement) => {
    return {
      width: newItemElement?.getBoundingClientRect()?.width ?? 0,
      height: newItemElement?.getBoundingClientRect()?.height ?? 0,
    };
  };
  let item = initializeItemBounds(draggableElement);

  // container data
  const initializaContainer = (newContainerElement: HTMLElement) => {
    return {
      min: {
        x: 0,
        y: 0,
      },
      max: {
        x: newContainerElement?.getBoundingClientRect()?.width ?? 0,
        y: newContainerElement?.getBoundingClientRect()?.height ?? 0,
      },
    };
  };
  let container = initializaContainer(containerElement);

  // Event to handle when the mouse is pressed
  const handleMouseDown = (e: MouseEvent) => {
    dragging = true;
    offset = {
      x: e.clientX - element.offsetLeft,
      y: e.clientY - element.offsetTop,
    };
  };

  // Event to handle when mouse is released
  const handleMouseUp = () => {
    if (dragging) {
      options?.OnDragEnd?.(pos().x, pos().y);
      dragging = false;
    }
  };

  // Event to handle when the mouse is being moved, aka the element is being dragged
  const handleMouseMove = (e: MouseEvent) => {
    // Exit early if we aren't dragging
    if (!dragging) return;

    // calculate new position
    let newX = e.clientX - offset.x,
      newY = e.clientY - offset.y;

    // x and y should be at least container's min, or at most container's max - the item size
    newX = Math.max(
      container.min.x,
      Math.min(newX, container.max.x - item.width)
    );
    newY = Math.max(
      container.min.y,
      Math.min(newY, container.max.y - item.height)
    );

    // Move element
    element.style.left = `${newX}px`;
    element.style.top = `${newY}px`;

    // Set state for onDragEnd
    setPos({ x: newX, y: newY });
  };

  return {
    subscribe: (
      draggableElement: HTMLElement,
      containerElement: HTMLElement
    ) => {
      // initialize container
      if (containerElement) {
        container = initializaContainer(containerElement);
      }
      // initialize draggable element
      if (draggableElement) {
        element = draggableElement;
        setPos({
          x: draggableElement.offsetLeft,
          y: draggableElement.offsetTop,
        });
        item = initializeItemBounds(draggableElement);
        element.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);
      }
    },
    unsubscribe: () => {
      if (element) {
        element.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
      }
    },
  };
};
