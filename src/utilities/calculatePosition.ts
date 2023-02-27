/* Uses the event captured from onmousemove to calculate the new position of the element being moved */
export const calculatePosition = (
  event: MouseEvent,
  draggedElement: HTMLElement,
  container: HTMLElement
) => {
  // Only do this if the dragged element exists, and has the proper class
  if (draggedElement?.classList.contains("dragging")) {
    // The dragged element should have listed its starting position when the mouse was pressed
    const dragged_initial_x =
      Number(draggedElement.getAttribute("data-element-x")) ?? 0;
    const dragged_initial_y =
      Number(draggedElement.getAttribute("data-element-y")) ?? 0;

    // Figure out how much the mouse has moved so far
    const mouseOffsetX =
      event.clientX - Number(draggedElement.getAttribute("data-start-x"));
    const mouseOffsetY =
      event.clientY - Number(draggedElement.getAttribute("data-start-y"));

    // Determine the positions of the container's boundaries
    const containerBox = container.getBoundingClientRect();
    const container_min_x = 0;
    const container_max_x = containerBox.width ?? 0;
    const container_min_y = 0;
    const container_max_y = containerBox.height ?? 0;

    // Calculate where the new position of the dragged element will be
    const dragged_element_box = draggedElement?.getBoundingClientRect();
    const dragged_width = dragged_element_box?.width ?? 0;
    const dragged_height = dragged_element_box?.height ?? 0;
    let dragged_new_x = dragged_initial_x + mouseOffsetX;
    let dragged_new_y = dragged_initial_y + mouseOffsetY;

    // Ensure new position is within container's bounds
    if (dragged_new_x < container_min_x) {
      // Dragged too far left
      dragged_new_x = container_min_x;
    }
    if (dragged_new_x + dragged_width > container_max_x) {
      // Dragged too far right
      dragged_new_x = container_max_x - dragged_width;
    }
    if (dragged_new_y < container_min_y) {
      // Dragged too far up
      dragged_new_y = container_min_y;
    }
    if (dragged_new_y + dragged_height > container_max_y) {
      // Dragged too far down
      dragged_new_y = container_max_y - dragged_height;
    }

    // Update the dragged element's left and top positions
    draggedElement.style.left = `${dragged_new_x}px`;
    draggedElement.style.top = `${dragged_new_y}px`;
  }
};
