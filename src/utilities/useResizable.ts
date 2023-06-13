import { createSignal } from "solid-js";
import { ResizeHandles } from "~/types";

type useResizableProps = {
  MinimumSize: number;
  OnResizeEnd?: (
    width: number,
    height: number,
    left: number,
    top: number
  ) => void;
};

export const useResizable = (options?: useResizableProps) => {
  // Current size and positioning
  const [resizeData, setResizeData] = createSignal({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  /* ----- Initialization ----- */
  // The element being resized
  let element: HTMLElement;
  // The element's container
  let containerElement: HTMLElement;
  // The handle elements
  let handle_topLeft: HTMLElement;
  let handle_topRight: HTMLElement;
  let handle_bottomLeft: HTMLElement;
  let handle_bottomRight: HTMLElement;

  // Initial mouse position
  let initialMouseX: number = 0;
  let initialMouseY: number = 0;

  // Element initial data
  let elementInitialData: {
    width: number;
    height: number;
    left: number;
    top: number;
  };

  // Container bounds
  let containerBounds: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    left: number;
    top: number;
  };

  // As small as we can resize
  let minimumSize = options?.MinimumSize || 100;

  // Are we in resize mode?
  let isResizing = false;
  // Which handle is being dragged
  let resizeType: ResizeHandles;

  // Initialize element data
  const initializeElements = (
    newElement: HTMLElement,
    newContainer: HTMLElement,
    newTLHandle: HTMLElement,
    newTRHandle: HTMLElement,
    newBLHandle: HTMLElement,
    newBRHandle: HTMLElement
  ) => {
    element = newElement;
    containerElement = newContainer;
    handle_topLeft = newTLHandle;
    handle_topRight = newTRHandle;
    handle_bottomLeft = newBLHandle;
    handle_bottomRight = newBRHandle;

    // Calculate data for container
    const containerBoundData = newContainer.getBoundingClientRect();
    containerBounds = {
      x1: 0,
      x2: containerBoundData.width,
      y1: 0,
      y2: containerBoundData.height,
      left: containerBoundData.left,
      top: containerBoundData.top,
    };

    // Calculate data for element
    const elementBoundData = newElement.getBoundingClientRect();
    elementInitialData = {
      width: elementBoundData.width,
      height: elementBoundData.height,
      left: elementBoundData.left - containerBoundData.left,
      top: elementBoundData.top - containerBoundData.top,
    };

    setResizeData({
      width: elementBoundData.width,
      height: elementBoundData.height,
      left: elementBoundData.left - containerBoundData.left,
      top: elementBoundData.top - containerBoundData.top,
    });
  };

  /* ----- Event Handlers ----- */
  // mouseDown event for each handle
  const mouseDown = (e: MouseEvent, handle: ResizeHandles) => {
    // Prevent other events from firing
    e.stopPropagation();

    // Mark as resizing
    isResizing = true;
    // Mark the resize type
    resizeType = handle;

    // Get initial mouse position
    initialMouseX = e.clientX;
    initialMouseY = e.clientY;
  };
  const handleTopLeftDown = (e: MouseEvent) => {
    mouseDown(e, "top-left");
  };
  const handleTopRightDown = (e: MouseEvent) => {
    mouseDown(e, "top-right");
  };
  const handleBottomLeftDown = (e: MouseEvent) => {
    mouseDown(e, "bottom-left");
  };
  const handleBottomRightDown = (e: MouseEvent) => {
    mouseDown(e, "bottom-right");
  };

  // Event to handle mouse moving, causing resize
  const handleMouseMove = (e: MouseEvent) => {
    // Check if layer is locked
    if (element.getAttribute("data-locked") === "true") return;
    // Exit early if we aren't resizing
    if (!isResizing) return;

    // Current position of the mouse
    const currentMouseX = e.clientX;
    const currentMouseY = e.clientY;

    // Exit early if we're out of bounds
    // This isn't a great way of doing this because it cause jittering when you pull towards the left or top
    // Instead we should find a way of preventing width / height growth when mouse is out of bounds
    if (
      currentMouseX < containerBounds.left ||
      currentMouseY < containerBounds.top
    )
      return;

    // Apply logic based on handle
    switch (resizeType) {
      // Calculate resize logic for top-left handle
      case "top-left": {
        // item's new width
        let newWidth =
          elementInitialData.width - (currentMouseX - initialMouseX);
        // item's new height
        let newHeight =
          elementInitialData.height - (currentMouseY - initialMouseY);
        // item's new left
        let newLeft = elementInitialData.left + (currentMouseX - initialMouseX);
        // item's new top
        let newTop = elementInitialData.top + (currentMouseY - initialMouseY);

        // Calculate minimum sizing: width
        if (newWidth < minimumSize) newWidth = minimumSize;
        if (newWidth > containerBounds.x2) newWidth = containerBounds.x2;
        // Calculate minimum sizing: height
        if (newHeight < minimumSize) newHeight = minimumSize;
        if (newHeight > containerBounds.y2) newHeight = containerBounds.y2;

        // Set styles to the element
        // Set width
        if (newLeft > containerBounds.x1) element.style.width = `${newWidth}px`;
        // Set height
        if (newTop > containerBounds.y1)
          element.style.height = `${newHeight}px`;

        // Don't scale beyond the container bounds
        if (newLeft < containerBounds.x1) newLeft = containerBounds.x1;
        if (newWidth > minimumSize) element.style.left = `${newLeft}px`;
        if (newTop < containerBounds.y1) newTop = containerBounds.y1;
        if (newHeight > minimumSize) element.style.top = `${newTop}px`;

        setResizeData((prev) => {
          return {
            ...prev,
            width: newWidth,
            height: newHeight,
            top: newTop,
            left: newLeft,
          };
        });

        break;
      }
      // Calculate resize logic for top-right handle
      case "top-right": {
        // item's new width
        let newWidth =
          elementInitialData.width + (currentMouseX - initialMouseX);
        // item's new height
        let newHeight =
          elementInitialData.height - (currentMouseY - initialMouseY);
        // item's new top
        let newTop = elementInitialData.top + (currentMouseY - initialMouseY);

        // Calculate minimum sizing: width
        if (newWidth + elementInitialData.left > containerBounds.x2)
          newWidth = containerBounds.x2 - elementInitialData.left;
        if (newWidth < minimumSize) newWidth = minimumSize;
        // Calculate minimum sizing: height
        if (newHeight < minimumSize) newHeight = minimumSize;
        // Check if top is within container bounds
        if (newTop < containerBounds.y1) newTop = containerBounds.y1;

        // Set element styles
        element.style.width = `${newWidth}px`;
        if (newTop > containerBounds.y1)
          element.style.height = `${newHeight}px`;
        if (newHeight > minimumSize) element.style.top = `${newTop}px`;

        setResizeData((prev) => {
          return {
            ...prev,
            width: newWidth,
            height: newHeight,
            top: newTop,
          };
        });

        break;
      }
      // Calculate resize logic for bottom-left handle
      case "bottom-left": {
        // item's new width
        let newWidth =
          elementInitialData.width - (currentMouseX - initialMouseX);
        // item's new height
        let newHeight =
          elementInitialData.height + (currentMouseY - initialMouseY);
        // item's new left
        let newLeft = elementInitialData.left + (currentMouseX - initialMouseX);

        // Calculate minimum sizing: width
        if (newWidth < minimumSize) newWidth = minimumSize;
        // Calculate minimum sizing: height
        if (newHeight < minimumSize) newHeight = minimumSize;
        // Calculate boundaries: left
        if (newLeft < containerBounds.x1) newLeft = containerBounds.x1;
        // Calculate boundaries: height
        if (newHeight + elementInitialData.top > containerBounds.y2)
          newHeight = containerBounds.y2 - elementInitialData.top;

        // Set element styles
        if (newLeft > containerBounds.x1) element.style.width = `${newWidth}px`;
        element.style.height = `${newHeight}px`;
        if (newWidth > minimumSize) element.style.left = `${newLeft}px`;

        setResizeData((prev) => {
          return {
            ...prev,
            width: newWidth,
            height: newHeight,
            left: newLeft,
          };
        });

        break;
      }
      // Calculate resize logic for bottom-right handle
      case "bottom-right": {
        // item's new width
        let newWidth =
          elementInitialData.width + (currentMouseX - initialMouseX);
        // item's new height
        let newHeight =
          elementInitialData.height + (currentMouseY - initialMouseY);

        // Calculate bounds
        if (newWidth + elementInitialData.left > containerBounds.x2)
          newWidth = containerBounds.x2 - elementInitialData.left;
        // Calculate minimum sizing: width
        if (newWidth < minimumSize) newWidth = minimumSize;
        // Calculate minimum sizing: height
        if (newHeight < minimumSize) newHeight = minimumSize;

        // Set element styles
        if (newHeight + elementInitialData.top > containerBounds.y2)
          newHeight = containerBounds.y2 - elementInitialData.top;
        element.style.width = `${newWidth}px`;
        element.style.height = `${newHeight}px`;

        setResizeData((prev) => {
          return {
            ...prev,
            width: newWidth,
            height: newHeight,
          };
        });

        break;
      }
    }
  };

  // Event to handle when mouse is released
  const handleMouseUp = () => {
    if (isResizing) {
      const data = resizeData();
      options?.OnResizeEnd?.(data.width, data.height, data.left, data.top);
      isResizing = false;
    }
  };

  return {
    subscribe: (
      resizableElement: HTMLElement,
      container: HTMLElement,
      handleTL: HTMLElement,
      handleTR: HTMLElement,
      handleBL: HTMLElement,
      handleBR: HTMLElement
    ) => {
      if (
        resizableElement &&
        container &&
        handleTL &&
        handleTR &&
        handleBL &&
        handleBR
      ) {
        // Initialize!
        initializeElements(
          resizableElement,
          container,
          handleTL,
          handleTR,
          handleBL,
          handleBR
        );

        handleTL.addEventListener("mousedown", handleTopLeftDown);
        handleTR.addEventListener("mousedown", handleTopRightDown);
        handleBL.addEventListener("mousedown", handleBottomLeftDown);
        handleBR.addEventListener("mousedown", handleBottomRightDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);
      }
    },
    unsubscribe: () => {
      if (handle_topLeft)
        handle_topLeft.removeEventListener("mousedown", handleTopLeftDown);
      if (handle_topRight)
        handle_topRight.removeEventListener("mousedown", handleTopRightDown);
      if (handle_bottomLeft)
        handle_bottomLeft.removeEventListener(
          "mousedown",
          handleBottomLeftDown
        );
      if (handle_bottomRight)
        handle_bottomRight.removeEventListener(
          "mousedown",
          handleBottomRightDown
        );

      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    },
  };
};
