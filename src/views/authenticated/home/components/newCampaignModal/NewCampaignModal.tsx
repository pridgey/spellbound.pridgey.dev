import React, { useRef } from "react";
import ReactDOM from "react-dom";
import {
  ModalBackground,
  ModalHeader,
  ModalWrapper,
} from "./NewCampaignModal.styles";
import { FlexContainer } from "@pridgey/ui-flexcontainer";
import { Button } from "./../../../../../components";

type NewCampaignModalProps = {
  OnConfirm: (campaignTitle: string) => void;
  OnCancel: () => void;
};

export const NewCampaignModal = ({
  OnConfirm,
  OnCancel,
}: NewCampaignModalProps) => {
  const inputRef = useRef<HTMLInputElement>(document.createElement("input"));

  return ReactDOM.createPortal(
    <ModalBackground>
      <ModalWrapper>
        <FlexContainer Direction="column">
          <ModalHeader>Let's Make a Campaign</ModalHeader>
          <input type="text" placeholder="Name Your Campaign" ref={inputRef} />
          <FlexContainer
            Direction="row"
            JustifyContent="flex-end"
            Margin="15px 0px 0px 0px"
          >
            <Button
              Margin="0px 5px"
              FontSize={12}
              OrdinalType="primary"
              OnClick={() => OnCancel()}
            >
              Cancel
            </Button>
            <Button
              Margin="0px 5px"
              FontSize={12}
              OrdinalType="primary"
              OnClick={() => OnConfirm(inputRef.current.value)}
            >
              Create
            </Button>
          </FlexContainer>
        </FlexContainer>
      </ModalWrapper>
    </ModalBackground>,
    document.body
  );
};
