import React from "react";
import { Container } from "./layout.styles";
import { HeaderBar } from "./../headerBar";

type LayoutProps = {
  children: React.ReactChild | React.ReactChild[];
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <HeaderBar />
      {children}
    </Container>
  );
};
