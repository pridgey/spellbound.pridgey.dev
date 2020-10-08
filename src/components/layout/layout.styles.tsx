import styled from "styled-components";
import { getColor } from "./../../utilities";

export const Container = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${getColor("background")};
  color: ${getColor("foreground")};
`;
