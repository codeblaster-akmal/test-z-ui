import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import {
  AutocompleteInputs,
  Container,
  PageHeader,
  FilterRow,
  HeroSection,
  Button,
} from "../../components";

const AlertWrapper = styled.div``;

function AlertList() {
  const history = useHistory();
  return (
    <AlertWrapper>
      <HeroSection />
      <Container>
        <PageHeader Title="Alert List">
          <Button
            onClick={() => {
              history.push("/createAlert");
            }}
          >
            Create
          </Button>
        </PageHeader>
        <FilterRow>
          <AutocompleteInputs
            placeholder="Events"
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
        </FilterRow>
      </Container>
    </AlertWrapper>
  );
}

export default AlertList;
