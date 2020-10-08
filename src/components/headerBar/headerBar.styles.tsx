import styled from "styled-components";
import { getColor } from "./../../utilities";

export const Bar = styled.header`
  height: 75px;
  width: 100vw;
  background-color: ${getColor("grayThree")};
`;

export const Title = styled.span`
  color: ${getColor("white")};
  font-size: 30px;
  font-weight: bold;
  font-family: "Bad Script", cursive;
  letter-spacing: 1.3px;
`;

export const Avatar = styled.div<{ Image: string }>`
  width: 50px;
  height: 50px;
  border: 3px solid ${getColor("green")};
  border-radius: 100%;
  background-color: ${getColor("grayOne")};
  background-image: url("${(props) => props.Image}");
  background-position: center;
  background-size: cover;
`;
