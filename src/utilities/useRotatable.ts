import { createSignal } from "solid-js";

type useRotatableProps = {
  OnRotateEnd?: (deg: number) => void;
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

export const useRotatable = () => {};

// ==================================================

type RotatableProps = {
  rotatableElement: HTMLElement | undefined;
  startingAngle: number;
  currentRotation: number;
  x1: number;
  y1: number;
};

// The default state object
const defaultState: RotatableProps = {
  rotatableElement: undefined,
  startingAngle: 0,
  currentRotation: 0,
  x1: 0,
  y1: 0,
};

/**
 * Hook to attach a rotatable functionality
 * @param OnRotateEnd Callback function to return the final rotation value
 * @returns subscribe and unsubscribe events to hook into the rotation
 */
export const useRotatable2 = (OnRotateEnd: (angle: number) => void) => {
  const [rotatableInfo, setRotatableInfo] =
    createSignal<RotatableProps>(defaultState);

  const handleMouseMove = (event: MouseEvent) => {
    const data = rotatableInfo();

    if (data?.rotatableElement) {
      const x2 = event.clientX;
      const y2 = event.clientY;

      const newAngle = getAngle(data.x1, data.y1, x2, y2);

      let angleDelta = data.currentRotation + newAngle - data.startingAngle;

      // Check if shift is held
      if (event.shiftKey) {
        const angleInterval = 15;
        angleDelta = Math.round(angleDelta / angleInterval) * angleInterval;
      }

      data.rotatableElement.style.rotate = `${angleDelta}deg`;
    }
  };

  const handleMouseUp = () => {
    setRotatableInfo(defaultState);
    OnRotateEnd?.(rotatableInfo()?.currentRotation ?? 0);
  };

  const handleMouseDown = (e: MouseEvent) => {
    const element = rotatableInfo()?.rotatableElement;
    if (element) {
      // calculate starting angle
      const rotatableElementBox = element.getBoundingClientRect();
      const x1 = rotatableElementBox.x + rotatableElementBox.width / 2;
      const y1 = rotatableElementBox.y + rotatableElementBox.height / 2;

      const x2 = e.clientX;
      const y2 = e.clientY;

      const startingAngle = getAngle(x1, y1, x2, y2);

      const currentRotation = Number(
        element.style.getPropertyValue("rotate").replace("deg", "") ?? 0
      );

      // Set state with starting information
      setRotatableInfo((currentState) => ({
        ...currentState,
        startingAngle,
        currentRotation,
        x1,
        y1,
      }));
    }
  };

  const unregister = () => {
    setRotatableInfo(defaultState);
    // Remove events
    rotatableInfo()?.rotatableElement?.removeEventListener(
      "mousedown",
      handleMouseDown
    );
    document?.documentElement?.removeEventListener(
      "mousemove",
      handleMouseMove
    );
    document?.documentElement?.removeEventListener("mouseup", handleMouseUp);
  };

  const register = (element: HTMLElement) => {
    if (element) {
      setRotatableInfo((currentState) => {
        return {
          ...currentState,
          rotatableElement: element,
        };
      });
      element.addEventListener("mousedown", handleMouseDown);
      document?.documentElement?.addEventListener("mousemove", handleMouseMove);
      document?.documentElement?.addEventListener("mouseup", handleMouseUp);
    }
  };

  return {
    register,
    unregister,
  };
};

/**
 *
 *
 *
 *            a
 * x ------------------- x
 *                       |
 *                       | o
 *                       |
 *                       x
 *
 *
 *   Math.atan(opposite / adjacent)
 *
 *   o = y1 - y2
 *   a = x1 - x2
 */
