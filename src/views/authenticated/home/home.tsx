import React, { useEffect, useState } from "react";
import { Button } from "./../../../components";
import { FlexContainer } from "@pridgey/ui-flexcontainer";
import { GridArea, GridContainer } from "@pridgey/ui-gridcontainer";
import { useAirtable } from "./../../../utilities";
import { CampaignHeader } from "./home.styles";
import { MemoizedCampaignList, NewCampaignModal } from "./components";
import { v4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";

export const Home = () => {
  const Airtable = useAirtable();
  const [User] = useAuthState(firebase.auth());

  const [showNewCampaignModal, setShowNewCampaignModal] = useState<boolean>(
    false
  );
  const [campaignResults, updateCampaignResults] = useState<any[]>([]);

  const retrieveCampaigns = () => {
    if (Airtable) {
      Airtable("Campaigns")
        .select({
          filterByFormula: `UserID = "${User.uid}"`,
        })
        .all()
        .then((results: Airtable.Records<{}>) => {
          const campaigns = results.map((result) => result.fields);
          updateCampaignResults(campaigns);
        });
    }
  };

  useEffect(() => {
    retrieveCampaigns();
  }, []);

  return (
    <GridContainer
      Columns="1fr"
      Rows="min-content 1fr"
      Areas={["header", "buttons"]}
      JustifyItems="flex-start"
      Gap={15}
      Padding={15}
    >
      <GridArea Area="header">
        <FlexContainer Direction="row">
          <CampaignHeader>Your Campaigns</CampaignHeader>
          <Button
            Margin={15}
            FontSize={12}
            OrdinalType="primary"
            OnClick={() => setShowNewCampaignModal(true)}
          >
            Create New Campaign
          </Button>
        </FlexContainer>
      </GridArea>
      <GridArea Area="buttons">
        <MemoizedCampaignList Results={campaignResults} />
      </GridArea>
      {showNewCampaignModal && (
        <NewCampaignModal
          OnCancel={() => setShowNewCampaignModal(false)}
          OnConfirm={(newTitle: string) => {
            Airtable("Campaigns")
              .create([
                {
                  fields: {
                    GameID: v4(),
                    UserID: User.uid,
                    Title: newTitle,
                  },
                },
              ])
              .then(() => {
                setShowNewCampaignModal(false);
                retrieveCampaigns();
              })
              .catch((err: any) => console.error(err));
          }}
        />
      )}
    </GridContainer>
  );
};
