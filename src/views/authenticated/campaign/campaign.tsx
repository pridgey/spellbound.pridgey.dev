import React from "react";
import * as queryString from "query-string";

export const Campaign = () => {
  const urlParams = queryString.parse(window.location.search);

  return <h1>{urlParams.i}</h1>;
};
