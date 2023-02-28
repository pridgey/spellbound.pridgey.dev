export const calculateResize = (
  event: MouseEvent,
  resizedElement: HTMLElement,
  container: HTMLElement
) => {
  // The initial position of the mouse
  const initialMouseX = Number(
    resizedElement.getAttribute("data-mouse-x") ?? 0
  );
  const initialMouseY = Number(
    resizedElement.getAttribute("data-mouse-y") ?? 0
  );

  // The initial size of the resized element
  const elementInitialWidth = Number(
    resizedElement.getAttribute("data-initial-width") ?? 0
  );
  const elementInitialHeight = Number(
    resizedElement.getAttribute("data-initial-height") ?? 0
  );

  // Current size of the element
  const resizedElementBox = resizedElement.getBoundingClientRect();
  const resizedCurrentWidth = resizedElementBox.width;
  const resizedCurrentHeight = resizedElementBox.height;

  // The initial location of the element
  const elementInitialX = Number(
    resizedElement.getAttribute("data-initial-x") ?? 0
  );
  const elementInitialY = Number(
    resizedElement.getAttribute("data-initial-y") ?? 0
  );

  // Current position of the mouse
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Which corner we are using to resize the element
  const handle = resizedElement.getAttribute("data-resize-handle");

  // The minimum size for scaling
  const minimumDimension = 100;

  // The container boundaries
  const containerMinimumX = 0;
  const containerMinimumY = 0;
  const containerBox = container.getBoundingClientRect();
  const containerMaximumX = containerBox.width;
  const containerMaximumY = containerBox.height;

  switch (handle) {
    case "top-left":
      // Calculate new dimensions and set element styles
      let topLeftWidth = elementInitialWidth - (mouseX - initialMouseX);
      // Calculate height
      let topLeftHeight = elementInitialHeight - (mouseY - initialMouseY);
      // Calculate Left position
      let topLeftX = elementInitialX + (mouseX - initialMouseX);
      // Calculate Top position
      let topLeftY = elementInitialY + (mouseY - initialMouseY);

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
        resizedElement.style.width = `${topLeftWidth}px`;
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
        resizedElement.style.height = `${topLeftHeight}px`;
      }

      // Don't scale beyond boundaries
      if (topLeftX < containerMinimumX) {
        topLeftX = containerMinimumX;
      }
      // If we hit minimum width, don't push left
      if (topLeftWidth > minimumDimension) {
        resizedElement.style.left = `${topLeftX}px`;
      }
      // Don't scale beyond boundaries
      if (topLeftY < containerMinimumY) {
        topLeftY = containerMinimumY;
      }
      // If we hit m inimum height, don't push down
      if (topLeftHeight > minimumDimension) {
        resizedElement.style.top = `${topLeftY}px`;
      }
      break;
    case "top-right":
      // Calculate new dimensions and set element styles
      let topRightWidth = elementInitialWidth + (mouseX - initialMouseX);
      let topRightHeight = elementInitialHeight - (mouseY - initialMouseY);
      let topRightY = elementInitialY + (mouseY - initialMouseY);

      if (topRightWidth + elementInitialX > containerMaximumX) {
        topRightWidth = containerMaximumX - elementInitialX;
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

      resizedElement.style.width = `${topRightWidth}px`;
      if (topRightY > containerMinimumY) {
        resizedElement.style.height = `${topRightHeight}px`;
      }
      if (topRightHeight > minimumDimension) {
        resizedElement.style.top = `${topRightY}px`;
      }
      break;
    case "bottom-left":
      // Calculate new dimensions and set element styles
      let bottomLeftWidth = elementInitialWidth - (mouseX - initialMouseX);
      let bottomLeftHeight = elementInitialHeight + (mouseY - initialMouseY);
      let bottomLeftX = elementInitialX + (mouseX - initialMouseX);

      if (bottomLeftWidth < minimumDimension) {
        bottomLeftWidth = minimumDimension;
      }
      if (bottomLeftHeight < minimumDimension) {
        bottomLeftHeight = minimumDimension;
      }
      if (bottomLeftX < containerMinimumX) {
        bottomLeftX = containerMinimumX;
      }
      if (bottomLeftHeight + elementInitialY > containerMaximumY) {
        bottomLeftHeight = containerMaximumY - elementInitialY;
      }

      if (bottomLeftX > containerMinimumX) {
        resizedElement.style.width = `${bottomLeftWidth}px`;
      }
      resizedElement.style.height = `${bottomLeftHeight}px`;
      if (bottomLeftWidth > minimumDimension) {
        resizedElement.style.left = `${bottomLeftX}px`;
      }
      break;
    case "bottom-right":
      // Calculate new dimensions and set element styles
      let bottomRightWidth = elementInitialWidth + (mouseX - initialMouseX);
      let bottomRightHeight = elementInitialHeight + (mouseY - initialMouseY);

      if (bottomRightWidth + elementInitialX > containerMaximumX) {
        bottomRightWidth = containerMaximumX - elementInitialX;
      }

      if (bottomRightWidth < minimumDimension) {
        bottomRightWidth = minimumDimension;
      }

      if (bottomRightHeight < minimumDimension) {
        bottomRightHeight = minimumDimension;
      }

      if (bottomRightHeight + elementInitialY > containerMaximumY) {
        bottomRightHeight = containerMaximumY - elementInitialY;
      }

      resizedElement.style.width = `${bottomRightWidth}px`;
      resizedElement.style.height = `${bottomRightHeight}px`;
      break;
  }
};
