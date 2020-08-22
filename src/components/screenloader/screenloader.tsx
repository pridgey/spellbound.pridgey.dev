import React from "react";
import { Fireball } from "@pridgey/loader-fireball";

export const Screenloader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: "rgba(0,0,0,0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Bad Script', cursive",
        color: "#fff",
      }}
    >
      <Fireball Width="13vw" />
      <h1>"I cast fireball"</h1>
    </div>
  );
};
