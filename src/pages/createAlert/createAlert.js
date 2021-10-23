import React, { useState } from "react";
import styled from "styled-components";
import {
  HeroSection,
  Container,
  PageHeader,
  AutocompleteInputs,
  TextFieldInputs,
  CustomCheckbox,
  Button,
} from "../../components";
import { Collapse } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
const CreateEventWrapper = styled.div`
  .alert-out {
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
  }
  .disable {
    display: grid;
    margin-top: 1rem;
    column-gap: 0.5rem;
    align-self: center;
    grid-template-columns: 1fr 0.1fr 3fr;
    > div {
      &:first-child {
        align-self: center;
        font: ${({ theme }) => theme.fontAppearance.default};
      }
      &:last-child {
        align-self: center;
      }
    }
  }
  .description-disable {
    margin-top: 1rem;
  }
  .MuiOutlinedInput-inputAdornedEnd {
    height: 8em !important;
  }
  .checkboxes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 1rem;
    align-items: center;
    margin-top: 1rem;
    div:nth-child(1),
    div:nth-child(5) {
      font: ${({ theme }) => theme.fontAppearance.default};
    }
    .MuiTypography-body1 {
      font: 900 0.57rem "Montserrat";
    }
    .MuiSvgIcon-root{
      width: 1rem;
      height: 1rem;
      margin-right: 0.3rem;
    }
  }
  .business {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 7vh);
    column-gap: 1rem;
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

function CreateAlert() {
  const [state, setState] = useState({
    email: true,
    sms: false,
    dashboard: false,
    roles: false,
    business: false,
    customer: false,
  });

  const handleCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { email, sms, dashboard, roles, business, customer } = state;
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
                <PageHeader Title="Alert"></PageHeader>
                <div className="alert-out">
                  <div className="alert-head">
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
                      <div className="disable">
                        <div className="my-0">Type</div>
                        <span>:</span>
                      </div>
                      <div className="disable">
                        <div className="my-0">SubType</div>
                        <span>:</span>
                      </div>
                    </div>
                    <div className="description-disable">
                      <TextFieldInputs
                        multiline
                        disabled
                        rowMax={10}
                        variant="outlined"
                        placeholder="Function Description"
                        className="description"
                      />
                    </div>
                    <div className="checkboxes">
                      <div>Trigger Type&nbsp;&nbsp;:</div>
                      <div>
                        <CustomCheckbox
                          checked={email}
                          onChange={handleCheck}
                          color="primary"
                          label="Email"
                          labelPlacement="end"
                          name="email"
                        />
                      </div>
                      <div>
                        <CustomCheckbox
                          checked={sms}
                          onChange={handleCheck}
                          color="primary"
                          label="SMS"
                          labelPlacement="end"
                          name="sms"
                        />
                      </div>
                      <div>
                        <CustomCheckbox
                          checked={dashboard}
                          onChange={handleCheck}
                          color="primary"
                          label="Dashboard"
                          labelPlacement="end"
                          name="dashboard"
                        />
                      </div>
                      <div>Roles&nbsp;&nbsp;:</div>
                      <div>
                        <CustomCheckbox
                          checked={roles}
                          onChange={handleCheck}
                          color="primary"
                          label="Roles"
                          labelPlacement="end"
                          name="roles"
                        />
                      </div>
                      <div>
                        <CustomCheckbox
                          checked={business}
                          onChange={handleCheck}
                          color="primary"
                          label="Business Users"
                          labelPlacement="end"
                          name="business"
                        />
                      </div>
                      <div>
                        <CustomCheckbox
                          checked={customer}
                          onChange={handleCheck}
                          color="primary"
                          label="Customer"
                          labelPlacement="end"
                          name="customer"
                        />
                      </div>
                    </div>

                    <Collapse in={roles || business} timeout="auto">
                      <div className="business">
                        {roles && (
                          <div>
                            <AutocompleteInputs
                              placeholder="Select Roles"
                              optionLabel="Title"
                            />
                          </div>
                        )}
                        {business && (
                          <AutocompleteInputs
                            placeholder="Select Business User"
                            optionLabel="Title"
                          />
                        )}
                      </div>
                    </Collapse>
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

export default CreateAlert;
