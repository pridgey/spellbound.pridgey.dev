import React from "react";
import { StyledButton } from "./Button.styles";

type ButtonProps = {
  FontSize?: number | string;
  Margin?: number | string;
  OrdinalType: "primary";
  OnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactChild | React.ReactChild[];
};

export const Button = ({
  FontSize,
  Margin,
  OrdinalType,
  OnClick,
  children,
}: ButtonProps) => {
  return (
    <StyledButton
      FontSize={FontSize}
      Margin={Margin}
      type="button"
      onClick={(event) => OnClick(event)}
    >
      {children}
    </StyledButton>
  );
};
