import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  AutocompleteInputs,
  HeroSection,
  Container,
  PageHeader,
  FilterRow,
  Button,
} from "../../components";

const EventWrapper = styled.div`
  /* padding: 2rem;S */
`;

function Events() {
  const history = useHistory();
  return (
    <EventWrapper>
      <HeroSection />
      <Container>
        <PageHeader Title="Event List">
          <Button
            onClick={() => {
              history.push("/createEvent");
            }}
          >
            Create
          </Button>
        </PageHeader>
        <FilterRow>
          <AutocompleteInputs
            placeholder="Type"
            variant="filled"
            optionLabel="Title"
          />
          <AutocompleteInputs
            placeholder="SubType"
            variant="filled"
            optionLabel="Title"
          />
          <AutocompleteInputs
            placeholder="Events"
            variant="filled"
            optionLabel="Title"
          />
        </FilterRow>
      </Container>
    </EventWrapper>
  );
}

export default Events;
