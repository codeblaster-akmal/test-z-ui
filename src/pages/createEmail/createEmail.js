import React, { useState } from "react";
import styled from "styled-components";
import {
  HeroSection,
  Container,
  PageHeader,
  CustomCheckbox,
  AutocompleteInputs,
  TextFieldInputs,
  Button,
  CustomSwitch,
} from "../../components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const CreateEventWrapper = styled.div`
  .email-out {
    display: grid;
    grid-template-columns: repeat(2, 2fr) 1fr;
    padding: 0 1rem;
    column-gap: 2rem;
    height: calc(100vh - 175px);
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 7vh);
    column-gap: 1rem;
    div:nth-child(3) {
      align-self: center;
    }
  }
  .text-container {
    display: grid;
    grid-template-rows: repeat(4, 7vh);
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    column-gap: 1rem;
    margin-top: 1rem;
  }
`;

const initialValues = {
  events: "",
};

const validationSchema = Yup.object().shape({
  events: Yup.string().required("Required"),
});

function CreateEmail() {
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleState = (event) => {
    setState(event.target.checked);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(props) => {
        const {
          // values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <CreateEventWrapper>
              <HeroSection />
              <Container>
                <PageHeader Title="Email"></PageHeader>
                <div className="email-out">
                  <div className="email-head">
                    <div className="grid-container">
                      <div>
                        <AutocompleteInputs
                          placeholder="Select Events"
                          optionLabel="Title"
                          name="events"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errors.events && touched.events}
                          helperText={
                            errors.events && touched.events && errors.events
                          }
                        />
                      </div>
                      <div></div>
                      <div>
                        <CustomCheckbox
                          checked={checked}
                          onChange={handleCheck}
                          color="primary"
                          label="Trigger Type"
                          labelPlacement="start"
                        />
                      </div>
                      <div>
                        <AutocompleteInputs
                          disabled={!checked}
                          placeholder="Select Trigger Type"
                          optionLabel="Title"
                        />
                      </div>
                    </div>
                    <div className="text-container">
                      <div>
                        <TextFieldInputs placeholder="Subject" />
                      </div>
                      <div>
                        <TextFieldInputs placeholder="SMS" />
                      </div>
                      <div>
                        <TextFieldInputs placeholder="Email" />
                      </div>
                      <div>
                        <TextFieldInputs placeholder="Dashboard" />
                      </div>
                      <div>
                        <CustomSwitch
                          checked={state}
                          onChange={handleState}
                          color="primary"
                          label="Status"
                          labelPlacement="start"
                        />
                      </div>
                    </div>
                    <div className="buttons">
                      <Button>Cancel</Button>
                      <Button type="submit">Save</Button>
                    </div>
                  </div>
                </div>
              </Container>
            </CreateEventWrapper>
          </Form>
        );
      }}
    </Formik>
  );
}

export default CreateEmail;
