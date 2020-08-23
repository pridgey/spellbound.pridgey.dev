import styled from "styled-components";

export const Layout = styled.main`
  display: grid;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.foreground};
  font-family: ${(props) => props.theme.font};
  grid-template-rows: 75px 1fr;
  padding: 15px;
  box-sizing: border-box;
`;
