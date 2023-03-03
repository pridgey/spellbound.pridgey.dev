import { createSignal } from "solid-js";

type RotatableProps = {
  rotatableElement: HTMLElement;
  startingAngle: number;
  currentRotation: number;
  x1: number;
  y1: number;
};

const getAngle = (x1: number, y1: number, x2: number, y2: number) => {
  const opposite = y1 - y2;
  const adjacent = x1 - x2;
  const angle = Math.atan2(opposite, adjacent);
  return angle * (180 / Math.PI);
};

export const useRotatable = () => {
  const [rotatableInfo, setRotatableInfo] = createSignal<RotatableProps>();

  const rotate = (event: MouseEvent) => {
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

  const unregister = () => {
    setRotatableInfo();
    document?.documentElement?.removeEventListener("mousemove", rotate);
  };

  const register = (element: HTMLElement, mouseX: number, mouseY: number) => {
    if (element) {
      const rotatableElementBox = element.getBoundingClientRect();
      const x1 = rotatableElementBox.x + rotatableElementBox.width / 2;
      const y1 = rotatableElementBox.y + rotatableElementBox.height / 2;

      const x2 = mouseX;
      const y2 = mouseY;

      const startingAngle = getAngle(x1, y1, x2, y2);

      const currentRotation = Number(
        element.style.getPropertyValue("rotate").replace("deg", "") ?? 0
      );

      setRotatableInfo({
        rotatableElement: element,
        startingAngle,
        currentRotation,
        x1,
        y1,
      });

      document?.documentElement?.addEventListener("mousemove", rotate);
      document?.documentElement?.addEventListener("mouseup", unregister);
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
