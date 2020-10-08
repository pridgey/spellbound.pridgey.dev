import React, { memo } from "react";
import { FlexContainer } from "@pridgey/ui-flexcontainer";
import { CampaignButton } from "./../../../../../components";

type CampaignListProps = {
  Results: any[];
};

const CampaignList = ({ Results }: CampaignListProps) => {
  return (
    <FlexContainer
      Direction="row"
      AlignItems="flex-start"
      JustifyContent="flex-start"
    >
      {!!Results.length
        ? Results.map((campaign, index) => {
            return (
              <CampaignButton
                key={index}
                ID={campaign.GameID}
                Title={campaign.Title}
              />
            );
          })
        : "No Results Found :("}
    </FlexContainer>
  );
};

export const MemoizedCampaignList = memo(CampaignList, (prev, next) => {
  return prev.Results.length === next.Results.length;
});
