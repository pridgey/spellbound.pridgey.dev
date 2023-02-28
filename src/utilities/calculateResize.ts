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
      // Calculate new dimensions and set element styles
      resizedElement.style.width = `${
        elementInitialWidth - (mouseX - initialMouseX)
      }px`;
      resizedElement.style.height = `${
        elementInitialHeight - (mouseY - initialMouseY)
      }px`;
      resizedElement.style.left = `${
        elementInitialX + (mouseX - initialMouseX)
      }px`;
      resizedElement.style.top = `${
        elementInitialY + (mouseY - initialMouseY)
      }px`;
      break;
    case "top-right":
      // Calculate new dimensions and set element styles
      resizedElement.style.width = `${
        elementInitialWidth + (mouseX - initialMouseX)
      }px`;
      resizedElement.style.height = `${
        elementInitialHeight - (mouseY - initialMouseY)
      }px`;
      resizedElement.style.top = `${
        elementInitialY + (mouseY - initialMouseY)
      }px`;
      break;
    case "bottom-left":
      // Calculate new dimensions and set element styles
      resizedElement.style.width = `${
        elementInitialWidth - (mouseX - initialMouseX)
      }px`;
      resizedElement.style.height = `${
        elementInitialHeight + (mouseY - initialMouseY)
      }px`;
      resizedElement.style.left = `${
        elementInitialX + (mouseX - initialMouseX)
      }px`;
      break;
    case "bottom-right":
      // Calculate new dimensions and set element styles
      resizedElement.style.width = `${
        elementInitialWidth + (mouseX - initialMouseX)
      }px`;
      resizedElement.style.height = `${
        elementInitialHeight + (mouseY - initialMouseY)
      }px`;
      break;
  }
};
