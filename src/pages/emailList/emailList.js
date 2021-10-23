import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import {
  HeroSection,
  Container,
  FilterRow,
  PageHeader,
  AutocompleteInputs,
  Button,
} from "../../components";

const EmailWrapper = styled.div`

`;

function EmailList() {
  const history = useHistory();
  return (
    <EmailWrapper>
      <HeroSection />
      <Container>
        <PageHeader Title="Email List">
          <Button
          onClick={() => {
            history.push("/createEmail");
          }}>Create</Button>
        </PageHeader>
        <FilterRow>
          <AutocompleteInputs
            placeholder="Events"
            variant="filled"
            optionLabel="Title"
          />
          <AutocompleteInputs
            placeholder="Subject"
            variant="filled"
            optionLabel="Title"
          />
          <AutocompleteInputs
            placeholder="Trigger Type"
            variant="filled"
            optionLabel="Title"
          />
          <AutocompleteInputs
            placeholder="Users"
            variant="filled"
            optionLabel="Title"
          />
          <AutocompleteInputs
            placeholder="Status"
            variant="filled"
            optionLabel="Title"
          />
        </FilterRow>
      </Container>
    </EmailWrapper>
  );
}

export default EmailList;
