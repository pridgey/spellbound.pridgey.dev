import styled from "styled-components";
import { getColor } from "./../../../../../utilities";

export const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalWrapper = styled.div`
  background-color: ${getColor("background")};
  color: ${getColor("foreground")};
  border-radius: 6px;
  padding: 20px;
  max-width: 90vw;
  max-height: 90vh;
`;

export const ModalHeader = styled.h1`
  font-size: 28px;
  color: ${getColor("foreground")};
`;
