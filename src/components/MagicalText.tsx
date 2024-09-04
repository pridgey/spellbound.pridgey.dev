import { createSignal, onCleanup, onMount, Component, JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { getRandomNumber } from "../utilities/randomRange";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  phase: number;
  color: number;
  glow: number;
}

interface Dimensions {
  width: number;
  height: number;
}

interface MagicalTextProps {
  children: JSX.Element;
}

export const MagicalText: Component<MagicalTextProps> = (props) => {
  const [particles, setParticles] = createStore<Particle[]>([]);
  const [dimensions, setDimensions] = createSignal<Dimensions>({
    width: 0,
    height: 0,
  });
  let containerRef: HTMLDivElement | undefined;
  let textRef: HTMLDivElement | undefined;

  console.log(getRandomNumber(-1, 1));

  const createParticle = (): Particle => ({
    x: Math.random() * dimensions().width,
    y: Math.random() * dimensions().height,
    size: getRandomNumber(1, 5),
    speedX: getRandomNumber(-1, 1),
    speedY: getRandomNumber(-1, 1),
    opacity: Math.random(),
    phase: Math.random() * Math.PI * 2,
    color: getRandomNumber(40, 70),
    glow: getRandomNumber(0, 3),
  });

  const updateDimensions = () => {
    if (containerRef) {
      setDimensions({
        width: containerRef.offsetWidth,
        height: containerRef.offsetHeight,
      });
    }
  };

  const animateParticles = () => {
    setParticles(
      particles.map((p) => ({
        ...p,
        x: (p.x + p.speedX / 5 + dimensions().width) % dimensions().width,
        y: (p.y + p.speedY / 5 + dimensions().height) % dimensions().height,
        opacity: (Math.sin(Date.now() / 1000 + p.phase) + 1) / 2,
      }))
    );

    requestAnimationFrame(animateParticles);
  };

  onMount(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    setParticles(Array(50).fill(null).map(createParticle));
    requestAnimationFrame(animateParticles);

    onCleanup(() => {
      window.removeEventListener("resize", updateDimensions);
    });
  });

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      <div
        ref={textRef}
        style={{
          position: "relative",
          "z-index": "2",
          "user-select": "none",
          color: "beige",
          "-webkit-text-stroke": "1.3px #555",
        }}
      >
        {props.children}
      </div>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          "z-index": "1",
        }}
      >
        <svg
          width={dimensions().width}
          height={dimensions().height}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            "pointer-events": "none",
          }}
        >
          {particles.map((particle) => (
            <circle
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill={`hsla(${particle.color}, 100%, 50%, ${particle.opacity})`}
              style={{
                filter: `drop-shadow(0 0 ${
                  particle.size * particle.glow
                }px white)`,
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};
