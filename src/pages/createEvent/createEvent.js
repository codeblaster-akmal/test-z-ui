import React from "react";
import styled from "styled-components";
import {
  HeroSection,
  Container,
  PageHeader,
  AutocompleteInputs,
  Button,
  TextFieldInputs,
} from "../../components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const dropDown = [
  { title: "Type 1" },
  { title: "Type 2" },
  { title: "Type 3" },
];

const CreateEventWrapper = styled.div`
  .outer-container {
    display: grid;
    grid-template-columns: repeat(2, 2fr) 1fr;
    column-gap: 5rem;
    height: calc(100vh - 175px);
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 9vh);
    column-gap: 1rem;
  }
  .events {
    .MuiOutlinedInput-inputAdornedEnd {
      height: auto !important;
    }
    .MuiInputBase-input {
      padding: 6px;
    }
  }
  .description {
    width: 100%;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    column-gap: 1rem;
    margin-top: 1rem;
  }
  .MuiOutlinedInput-inputAdornedEnd {
    height: 8em !important;
  }
`;

const initialValues = {
  type: "",
  subtype: "",
  functions: "",
};

const validationSchema = Yup.object().shape({
  type: Yup.string().required("Required"),
  subtype: Yup.string().required("Required"),
  functions: Yup.string().required("Required"),
});

function CreateEvent() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(props) => {
        const {
          values,
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
                <PageHeader Title="Event"></PageHeader>
                <div className="outer-container">
                  <div className="event-out">
                    <div className="grid-container">
                      <AutocompleteInputs
                        placeholder="Select Type"
                        name="type"
                        options={dropDown}
                        optionLabel="title"
                        value={values.dropDown}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errors.type && touched.type}
                        helperText={errors.type && touched.type && errors.type}
                      />
                      <AutocompleteInputs
                        placeholder="Select SubType"
                        optionLabel="Title"
                        name="subtype"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errors.subtype && touched.subtype}
                        helperText={
                          errors.subtype && touched.subtype && errors.subtype
                        }
                      />
                    </div>
                    <TextFieldInputs
                      variant="outlined"
                      placeholder="Write Message"
                      className="events"
                    />
                  </div>
                  <div className="description">
                    <div className="grid-container">
                      <AutocompleteInputs
                        placeholder="Select Functions"
                        optionLabel="Title"
                        name="functions"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errors.functions && touched.functions}
                        helperText={
                          errors.functions &&
                          touched.functions &&
                          errors.functions
                        }
                      />
                    </div>
                    <TextFieldInputs
                      multiline
                      rowMax={10}
                      variant="outlined"
                      placeholder="Function Description"
                      className="description"
                    />
                    <div className="buttons">
                      <Button>Cancel</Button>
                      <Button type="submit" disabled={!values.dropDown}>
                        Save
                      </Button>
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

export default CreateEvent;
