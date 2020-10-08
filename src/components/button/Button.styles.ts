import styled from "styled-components";
import { getColor, numberOrStringToCSS } from "./../../utilities";

export const StyledButton = styled.button<{
  FontSize?: number | string;
  Margin?: number | string;
}>`
  border: 1px solid ${getColor("green")};
  background: transparent;
  color: ${getColor("green")};
  font-weight: bolder;
  padding: 10px;
  font-size: ${(props) => numberOrStringToCSS(props.FontSize, "16px")};
  box-sizing: border-box;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 6px;
  margin: ${(props) => numberOrStringToCSS(props.Margin, "")};

  &:hover {
    background-color: ${getColor("green")};
    color: ${getColor("white")};
  }
`;
