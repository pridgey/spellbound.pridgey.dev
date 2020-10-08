import styled from "styled-components";
import { getColor } from "./../../../utilities";

export const Layout = styled.main`
  display: grid;
  width: 100vw;
  height: 100vh;
  background-color: ${getColor("background")};
  color: ${getColor("foreground")};
  grid-template-rows: 75px 1fr;
  padding: 15px;
  box-sizing: border-box;
`;

export const CampaignHeader = styled.h1`
  font-size: 28px;
`;
