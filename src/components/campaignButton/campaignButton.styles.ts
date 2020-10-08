import styled from "styled-components";
import { getColor } from "../../utilities";

export const ButtonContentContainer = styled.div`
  position: relative;
  width: 260px;
  height: 160px;
  overflow: hidden;
  border-radius: 6px;
`;

export const ButtonContentBackground = styled.div`
  position: absolute;
  width: 300%;
  height: 300%;
  left: -50%;
  top: -500%;
  background-color: ${getColor("green")};
  transition: top 1s;
  transform: rotate(45deg);

  ${ButtonContentContainer}:hover & {
    top: 0;
    transition: top 1s;
  }
`;

export const ButtonContentPreview = styled.div<{ BackgroundUrl: string }>`
  position: absolute;
  width: 250px;
  height: 150px;
  left: 5px;
  top: 5px;
  background-color: ${getColor("white")};
  background-image: url("${(props) => props.BackgroundUrl}");
  background-position: center;
  background-size: cover;
  border-radius: 6px;
  cursor: pointer;
  box-sizing: border-box;
`;

export const ButtonTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 0px 0px 6px 6px;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${getColor("white")};
  display: flex;
  align-items: center;
  font-weight: bold;
  letter-spacing: 1.3px;
  padding: 5px;
  box-sizing: border-box;
  height: 50px;
`;
