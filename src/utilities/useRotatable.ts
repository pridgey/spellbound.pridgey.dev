import { createSignal } from "solid-js";

type RotatableProps = {
  rotatableElement: HTMLElement;
};

export const useRotatable = () => {
  const [rotatableInfo, setRotatableInfo] = createSignal<RotatableProps>();

  const rotate = (event: MouseEvent) => {
    console.log("rotate");

    // figure out angle between center of element, and mouse current position
  };

  const unregister = () => {
    setRotatableInfo();
    document?.documentElement?.removeEventListener("mousemove", rotate);
  };

  const register = (element: HTMLElement) => {
    setRotatableInfo({
      rotatableElement: element,
    });

    document?.documentElement?.addEventListener("mousemove", rotate);
    document?.documentElement?.addEventListener("mouseup", unregister);
  };

  return {
    register,
    unregister,
  };
};
