import styled, { keyframes } from "styled-components";

const dropIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-5px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
`;

export const BackgroundCanvas = styled.canvas`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
`;

export const ContentContainer = styled.main`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const MainHeader = styled.h1`
  color: white;
  font-family: "Raleway", sans-serif;
  font-size: 3.5vw;
  font-weight: 300;
  letter-spacing: 3.4px;
  margin: 0;
`;

export const Link = styled.button`
  opacity: 0;
  color: white;
  font-family: "Raleway", sans-serif;
  font-size: 1.5vw;
  font-weight: 200;
  letter-spacing: 2px;
  background-color: transparent;
  border: 0;
  padding: 6px 15px;
  cursor: pointer;
  animation-name: ${dropIn};
  animation-duration: 0.5s;
  animation-delay: 2s;
  animation-fill-mode: forwards;
  transition: all 0.2s;

  &:hover {
    color: #5a189a;
    font-weight: 400;
    transition: all 0.2s;
  }
`;
