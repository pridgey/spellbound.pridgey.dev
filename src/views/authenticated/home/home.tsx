import React from "react";
import styled from "styled-components";

const Test = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.yellow};
  color: ${(props) => props.theme.okay};
`;

export const Home = () => {
  return <Test>Hello World 2</Test>;
};
