export const calculateResize = (
  event: MouseEvent,
  resizedElement: HTMLElement,
  container: HTMLElement
) => {
  const initialMouseX = Number(
    resizedElement.getAttribute("data-mouse-x") ?? 0
  );
  const initialMouseY = Number(
    resizedElement.getAttribute("data-mouse-y") ?? 0
  );

  const elementInitialWidth = Number(
    resizedElement.getAttribute("data-initial-width") ?? 0
  );
  const elementInitialHeight = Number(
    resizedElement.getAttribute("data-initial-height") ?? 0
  );

  const elementInitialX = Number(
    resizedElement.getAttribute("data-initial-x") ?? 0
  );
  const elementInitialY = Number(
    resizedElement.getAttribute("data-initial-y") ?? 0
  );

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const handle = resizedElement.getAttribute("data-resize-handle");

  switch (handle) {
    case "top-left":
      const newWidth = elementInitialWidth - (mouseX - initialMouseX);
      const newHeight = elementInitialWidth - (mouseY - initialMouseY);
      const newX = elementInitialX + (mouseX - initialMouseX);
      const newY = elementInitialY + (mouseY - initialMouseY);
      resizedElement.style.width = `${newWidth}px`;
      resizedElement.style.height = `${newHeight}px`;
      resizedElement.style.left = `${newX}px`;
      resizedElement.style.top = `${newY}px`;
      break;
  }
};

/**bottom-right:
  new_width = element_original_width + (mouseX - original_mouseX)
  new_height = element_original_height + (mouseY - original_mouseY)
bottom-left:
  new_width = element_original_width - (mouseX - original_mouseX)
  new_height = element_original_height + (mouseY - original_mouseY)
  new_x = element_original_x - (mouseX - original_mouseX)
top-right:
  new_width = element_original_width + (mouseX - original_mouseX)
  new_height = element_original_height - (mouseY - original_mouseY)
  new_y = element_original_y + (mouseY - original_mouseY)
top-left:
  new_width = element_original_width - (mouseX - original_mouseX)
  new_height = element_original_height - (mouseY - original_mouseY)
  new_x = element_original_x + (mouseX - original_mouseX)
  new_y = element_original_y + (mouseY - original_mouseY) */
