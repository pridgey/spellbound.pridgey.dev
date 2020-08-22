import React, { useRef, useEffect } from "react";
import {
  BackgroundRenderer,
  loadImage,
  isWebGLSupported,
  EffectType,
} from "midori-bg";
import {
  BackgroundCanvas,
  ContentContainer,
  Link,
  MainHeader,
} from "./home.styles";
import firebase from "firebase";

export const Home = () => {
  const canvasRef = useRef(document.createElement("canvas"));

  useEffect(() => {
    if (isWebGLSupported()) {
      // pass in a canvas DOM element
      const renderer = new BackgroundRenderer(canvasRef.current);

      // the loadImage function returns a promise which you can use to load your images.
      // the path can be a url or local path to a file. Make sure to check CORS if using a url.
      loadImage(
        "https://images.unsplash.com/photo-1505159940484-eb2b9f2588e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      )
        // set background
        .then((image) => {
          renderer.setBackground(image);
        })
        .then(() => {
          const { particles } = renderer.background;
          particles.generate([
            {
              name: "small",
              amount: 200,
              maxSize: 5,
              maxOpacity: 0.9,
              minGradient: 0.75,
              maxGradient: 1.0,
            },
            {
              name: "medium",
              amount: 50,
              maxSize: 12,
              maxOpacity: 0.9,
              minGradient: 0.75,
              maxGradient: 1.0,
              smoothing: 0.8,
            },
            {
              name: "large",
              amount: 30,
              minSize: 100,
              maxSize: 125,
              maxOpacity: 0.07,
              minGradient: 1.0,
              maxGradient: 1.0,
              smoothing: 0.65,
            },
          ]);
          particles.move(
            "small",
            { distance: 1, angle: -90 },
            { duration: 5, loop: true }
          );
          particles.move(
            "medium",
            { distance: 0.3, angle: -93 },
            { duration: 5, loop: true }
          );
          particles.move(
            "large",
            { distance: 0.4, angle: 35 },
            { duration: 5, loop: true }
          );
        })
        .then(() => {
          const { effects: backgroundEffects } = renderer.background;
          backgroundEffects.removeAll();
          backgroundEffects.set(EffectType.Bloom, { radius: 3, passes: 2 });
          backgroundEffects.set(EffectType.Vignette, {
            darkness: 1.3,
            offset: 1,
          });
        })
        .then(() => {
          const { camera } = renderer.background;
          camera.sway(
            { y: -0.05 },
            {
              delay: 0,
              duration: 3,
              loop: true,
            }
          );
        })
        // handle errors
        .catch((err) => console.error(err));
    }
  }, [canvasRef]);

  return (
    <>
      <BackgroundCanvas ref={canvasRef} />
      <ContentContainer>
        <MainHeader>Spellbound</MainHeader>
        <Link
          onClick={() => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider);
          }}
        >
          Login
        </Link>
      </ContentContainer>
    </>
  );
};
