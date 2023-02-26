import { Title } from "solid-start";
import { Outlet } from "@solidjs/router";
import { css } from "solid-styled";
import { useNavigate } from "solid-start";

const Layout = () => {
  const navigate = useNavigate();
  css`
    .layout {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 60% 40%;
      grid-template-areas: "banner banner" "create join";
    }

    .banner {
      grid-area: banner;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(transparent 50%, black) 0% 0% / cover,
        url("images/Mielikikis Cavern.jpg") center center;
      background-size: cover;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
      user-select: none;
    }

    .box {
      width: 100%;
      height: 100%;
      font-size: 10rem;
      font-family: Lato, sans-serif;
      font-weight: bold;
      text-align: left;
      color: white;
      cursor: pointer;
      padding: 3rem;
      display: flex;
      align-items: flex-end;
      border: 0px;
      background-size: 100% !important;
      transition: all 0.2s linear;
    }

    .box:hover {
      background-size: 105% !important;
      transition: all 0.2s linear;
    }

    .box:focus {
      background-size: 105% !important;
      transition: all 0.2s linear;
      box-shadow: rgba(233, 233, 241, 0.25) 0px 30px 60px -12px inset,
        rgba(255, 255, 255, 0.3) 0px 18px 36px -18px inset;
    }

    .create {
      grid-area: create;
      background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)) 0% 0% /
          100%,
        url("images/creategame.png") center center;
    }

    .join {
      grid-area: join;
      background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)) 0% 0% /
          100%,
        url("images/joingame.png") center center;
    }
  `;

  return (
    <div class="layout">
      <button class="box create" onClick={() => navigate("/game")}>
        Create <br />a game
      </button>
      <button class="box join">
        Join <br />a game
      </button>
      <div class="banner">
        <h1>Spellbound</h1>
      </div>
    </div>
  );
};

export default Layout;
