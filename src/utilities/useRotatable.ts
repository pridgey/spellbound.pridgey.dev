import { createSignal } from "solid-js";

type useRotatableProps = {
  OnRotateEnd?: (deg: number) => void;
  ShiftAngleInterval?: number;
};

/**
 * Helper function to calculate the rotation based on initial mouse position and new mouse position
 * @param x1 x value of first coordinate
 * @param y1 y value of first coordinate
 * @param x2 x value of second coordinate
 * @param y2 y value of second coordinate
 * @returns the calculated angle
 */
const getAngle = (x1: number, y1: number, x2: number, y2: number) => {
  const opposite = y1 - y2;
  const adjacent = x1 - x2;
  const angle = Math.atan2(opposite, adjacent);
  return angle * (180 / Math.PI);
};

export const useRotatable = (options?: useRotatableProps) => {
  // Current rotation
  const [rotation, setRotation] = createSignal(0);

  /* ----- Initialization ----- */
  // The actual element being rotated
  let element: HTMLElement;
  // The handle dragged to rotate the element
  let handle: HTMLElement;

  // Midpoint of the rotatable element
  let elementMidpoint = { x: 0, y: 0 };

  // Initial rotation, for calculations during move
  let initialRotation = 0;

  // Controls if we are in a rotating state
  let isRotating = false;

  // Calculate the item's midpoint
  const calculateMidpoint = (newElement: HTMLElement) => {
    const boundingRect = newElement.getBoundingClientRect();

    const x = boundingRect.x + boundingRect.width / 2;
    const y = boundingRect.y + boundingRect.height / 2;

    elementMidpoint = {
      x,
      y,
    };
  };

  /* ----- Event Handlers ----- */

  // Event to handle when the mouse is pressed
  const handleMouseDown = (e: MouseEvent) => {
    // Prevent other events (draggable 👀) from firing
    e.preventDefault();
    e.stopPropagation();

    // Mark as rotating
    isRotating = true;

    // Get coordinates of the mouse click
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate the starting angle
    const startingAngle = getAngle(
      elementMidpoint.x,
      elementMidpoint.y,
      mouseX,
      mouseY
    );

    // Grab current rotation of the element
    const currentRotation = Number(
      element.style.getPropertyValue("rotate").replace("deg", "") ?? 0
    );

    // Set the starting angle which will be subtracted from the move angle to determine rotation
    initialRotation = startingAngle + currentRotation;
  };

  // Event to handle when mouse is released
  const handleMouseUp = () => {
    if (isRotating) {
      options?.OnRotateEnd?.(rotation());
      isRotating = false;
    }
  };

  // Event to handle mouse moving, causing the rotation
  const handleMouseMove = (e: MouseEvent) => {
    // Exit early if we aren't rotating
    if (!isRotating) return;

    // Get current mouse position
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate angle between element center and mouse position
    const newAngle = getAngle(
      elementMidpoint.x,
      elementMidpoint.y,
      mouseX,
      mouseY
    );

    // The difference between the new angle and the initial roation
    let angleDelta = newAngle - initialRotation;

    // If shift key is held, rotate in 15deg increments
    if (e.shiftKey) {
      const angleInterval = options?.ShiftAngleInterval ?? 15;
      angleDelta = Math.round(angleDelta / angleInterval) * angleInterval;
    }

    // Set element's rotation
    element.style.rotate = `${angleDelta}deg`;

    // Update state for callback
    setRotation(angleDelta);
  };

  return {
    subscribe: (rotatableElement: HTMLElement, handleElement: HTMLElement) => {
      // Initialize this element
      if (rotatableElement) {
        // Set hook element to this new element
        element = rotatableElement;
        // Set handle element to the new one
        handle = handleElement;
        // Calculate element midpoint
        calculateMidpoint(rotatableElement);
        // Add events
        handle.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);
      }
    },
    unsubscribe: () => {
      if (handle) {
        handle.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
      }
    },
  };
};

// ==================================================

// type RotatableProps = {
//   rotatableElement: HTMLElement | undefined;
//   startingAngle: number;
//   currentRotation: number;
//   x1: number;
//   y1: number;
// };

// // The default state object
// const defaultState: RotatableProps = {
//   rotatableElement: undefined,
//   startingAngle: 0,
//   currentRotation: 0,
//   x1: 0,
//   y1: 0,
// };

// /**
//  * Hook to attach a rotatable functionality
//  * @param OnRotateEnd Callback function to return the final rotation value
//  * @returns subscribe and unsubscribe events to hook into the rotation
//  */
// export const useRotatable2 = (OnRotateEnd: (angle: number) => void) => {
//   const [rotatableInfo, setRotatableInfo] =
//     createSignal<RotatableProps>(defaultState);

//   const handleMouseMove = (event: MouseEvent) => {
//     const data = rotatableInfo();

//     if (data?.rotatableElement) {
//       const x2 = event.clientX;
//       const y2 = event.clientY;

//       const newAngle = getAngle(data.x1, data.y1, x2, y2);

//       let angleDelta = data.currentRotation + newAngle - data.startingAngle;

//       // Check if shift is held
//       if (event.shiftKey) {
//         const angleInterval = 15;
//         angleDelta = Math.round(angleDelta / angleInterval) * angleInterval;
//       }

//       data.rotatableElement.style.rotate = `${angleDelta}deg`;
//     }
//   };

//   const handleMouseUp = () => {
//     setRotatableInfo(defaultState);
//     OnRotateEnd?.(rotatableInfo()?.currentRotation ?? 0);
//   };

//   const handleMouseDown = (e: MouseEvent) => {
//     const element = rotatableInfo()?.rotatableElement;
//     if (element) {
//       // calculate starting angle
//       const rotatableElementBox = element.getBoundingClientRect();
//       const x1 = rotatableElementBox.x + rotatableElementBox.width / 2;
//       const y1 = rotatableElementBox.y + rotatableElementBox.height / 2;

//       const x2 = e.clientX;
//       const y2 = e.clientY;

//       const startingAngle = getAngle(x1, y1, x2, y2);

//       const currentRotation = Number(
//         element.style.getPropertyValue("rotate").replace("deg", "") ?? 0
//       );

//       // Set state with starting information
//       setRotatableInfo((currentState) => ({
//         ...currentState,
//         startingAngle,
//         currentRotation,
//         x1,
//         y1,
//       }));
//     }
//   };

//   const unregister = () => {
//     setRotatableInfo(defaultState);
//     // Remove events
//     rotatableInfo()?.rotatableElement?.removeEventListener(
//       "mousedown",
//       handleMouseDown
//     );
//     document?.documentElement?.removeEventListener(
//       "mousemove",
//       handleMouseMove
//     );
//     document?.documentElement?.removeEventListener("mouseup", handleMouseUp);
//   };

//   const register = (element: HTMLElement) => {
//     if (element) {
//       setRotatableInfo((currentState) => {
//         return {
//           ...currentState,
//           rotatableElement: element,
//         };
//       });
//       element.addEventListener("mousedown", handleMouseDown);
//       document?.documentElement?.addEventListener("mousemove", handleMouseMove);
//       document?.documentElement?.addEventListener("mouseup", handleMouseUp);
//     }
//   };

//   return {
//     register,
//     unregister,
//   };
// };

// /**
//  *
//  *
//  *
//  *            a
//  * x ------------------- x
//  *                       |
//  *                       | o
//  *                       |
//  *                       x
//  *
//  *
//  *   Math.atan(opposite / adjacent)
//  *
//  *   o = y1 - y2
//  *   a = x1 - x2
//  */
