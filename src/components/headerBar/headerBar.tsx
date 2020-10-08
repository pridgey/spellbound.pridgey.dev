import React from "react";
import { Avatar, Bar, Title } from "./headerBar.styles";
import { FlexContainer } from "@pridgey/ui-flexcontainer";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";

export const HeaderBar = () => {
  const [user] = useAuthState(firebase.auth());

  return (
    <Bar>
      <FlexContainer JustifyContent="space-between" Padding={15}>
        <Title>Spellbound</Title>
        <Avatar Image={user?.photoURL} />
      </FlexContainer>
    </Bar>
  );
};
