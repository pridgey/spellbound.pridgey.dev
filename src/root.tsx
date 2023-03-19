// @refresh reload
import { Suspense } from "solid-js";
import { useAssets } from "solid-js/web";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import { css, renderSheets, StyleRegistry } from "solid-styled";

function GlobalStyles() {
  css`
    @font-face {
      font-family: "Srisakdi";
      src: url("/fonts/Srisakdi/Srisakdi-Regular.ttf") format("truetype");
    }

    @font-face {
      font-family: "Srisakdi";
      src: url("/fonts/Srisakdi/Srisakdi-Bold.ttf") format("truetype");
      font-weight: bold;
    }

    @font-face {
      font-family: "Lato";
      src: url("/fonts/Lato-Regular.ttf") format("truetype");
    }

    @font-face {
      font-family: "Lato";
      src: url("/fonts/Lato-Bold.ttf") format("truetype");
      font-weight: bold;
    }

    @global {
      * {
        font-size: 8px;
        box-sizing: border-box;
      }
      body {
        background-color: black;
        font-family: Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
      }

      a {
        margin-right: 1rem;
      }

      @media (min-width: 480px) {
        h1 {
          max-width: none;
        }

        p {
          max-width: none;
        }
      }
    }
  `;
  return null;
}

export default function Root() {
  const sheets = [];
  useAssets(() => renderSheets(sheets));

  return (
    <StyleRegistry styles={sheets}>
      <Html lang="en">
        <Head>
          <Title>Spellbound</Title>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=1" />
          <Link rel="icon" href="/favicon.svg" />
        </Head>
        <Body>
          <GlobalStyles />
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </Body>
      </Html>
    </StyleRegistry>
  );
}
