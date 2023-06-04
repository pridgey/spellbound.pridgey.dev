import Moveable from "moveable";

export const useMoveable = (item: HTMLElement, container: HTMLElement) => {
  return new Moveable(container, {
    target: item,
    // If the container is null, the position is fixed. (default: parentElement(document.body))
    container: container,
    bounds: { left: 0, right: 1000, top: 500, bottom: 1000 },
    draggable: true,
    resizable: true,
    scalable: false,
    rotatable: true,
    warpable: false,
    // Enabling pinchable lets you use events that
    // can be used in draggable, resizable, scalable, and rotateable.
    pinchable: false, // ["resizable", "scalable", "rotatable"]
    origin: true,
    keepRatio: false,
    // Resize, Scale Events at edges.
    edge: false,
    throttleDrag: 0,
    throttleResize: 0,
    throttleScale: 0,
    throttleRotate: 0,
    dragWithClip: true,
  });
};
