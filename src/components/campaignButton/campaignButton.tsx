import React from "react";
import {
  ButtonContentContainer,
  ButtonContentBackground,
  ButtonContentPreview,
  ButtonTitle,
} from "./campaignButton.styles";
import { Link } from "react-router-dom";
import { randomNumber, limitStringLength } from "./../../utilities";

type CampaignButtonProps = {
  ID: string;
  Title: string;
};

export const CampaignButton = ({ ID, Title }: CampaignButtonProps) => {
  return (
    <Link to={`/campaign?i=${ID}`}>
      <ButtonContentContainer
        title={Title.length > 25 ? Title : ""}
        aria-label={Title}
      >
        <ButtonContentBackground />
        <ButtonContentPreview
          BackgroundUrl={`https://source.unsplash.com/random/${randomNumber(
            300,
            500
          )}x${randomNumber(300, 500)}`}
        >
          <ButtonTitle>{limitStringLength(Title, 25)}</ButtonTitle>
        </ButtonContentPreview>
      </ButtonContentContainer>
    </Link>
  );
};
