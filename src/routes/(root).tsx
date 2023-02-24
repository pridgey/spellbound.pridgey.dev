import { Title } from "solid-start";
import { Outlet } from "@solidjs/router";
import { css } from "solid-styled";

const Layout = () => {
  css`
    .container {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(transparent 50%, black) 0% 0% / cover,
        url("images/Mielikikis Cavern.jpg") center center;
      background-size: cover;
    }

    h1 {
      display: flex;
      justify-content: flex-start;
      color: #fdfcfc;
      font-size: 20rem;
      font-weight: bold;
      font-family: Srisakdi;
      margin: 0px;
      text-shadow: 3px 3px 2px rgba(62, 62, 62, 1);
    }

    main {
      width: 100%;
      height: 100%;
    }
  `;

  return (
    <div class="container">
      <header>
        <h1>Spellbound</h1>
        <div class="scene"></div>
      </header>
      {/* <main>
        <Outlet />
      </main> */}
    </div>
  );
};

export default Layout;
