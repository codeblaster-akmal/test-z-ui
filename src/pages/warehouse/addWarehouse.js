import React, { useState, useEffect, useCallback } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Button from "components/button";
import { WarehouseModalStyles } from "./warehouseStyles";
import {
  AutocompleteInputs,
  TextFieldInputs,
  CustomModal,
  CustomSwitch,
} from "components";
import { Grid, IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  createWarehouse,
  getCounty,
  updateWarehouse,
} from "./warehouse.service";
import { createPayloadObj } from "utils/utilsFunc";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(2, "Name should be atleast 2 letters"),
  type: Yup.object().required("Required"),
  addressLine1: Yup.string().required("Required"),
  county: Yup.object().required("Required"),
  cityId: Yup.object().required("Required"),
  zipcode: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format"),
});

const AddWarehouse = (props) => {
  const {
    open,
    handleClose,
    warehouseDataHandler,
    initialValues,
    typeDropDown,
  } = props;

  const [state, setState] = useState({ countyOption: [], cityOption: [] });

  const handleAutoComplete = (name, setFieldValue) => (e, value) => {
    setFieldValue(name, value !== null ? value : initialValues[name]);
    if (name === "county") {
      setState({ ...state, cityOption: value.cities });
    }
  };

  const fetchDataHandler = useCallback(async () => {
    const { data } = await getCounty();
    console.log(`data`, data);
    setState((prevState) => {
      return { ...prevState, countyOption: data };
    });
  }, []);

  const onSubmitHandler = async (values) => {
    try {
      const postUpdatedData = createPayloadObj(values, ["status"]);
      if (values.id) {
        await updateWarehouse(values.id, postUpdatedData);
      } else {
        await createWarehouse(postUpdatedData);
      }
      handleClose();
      warehouseDataHandler();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  return (
    <CustomModal open={open} FadeIn={open} onClose={handleClose}>
      <WarehouseModalStyles>
        <div className="title-section">
          <div className="modal-title">Store details</div>
          <IconButton
            size="small"
            color="primary"
            component="span"
            className="cancel-icon"
            onClick={handleClose}
          >
            <CancelIcon />
          </IconButton>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
          enableReinitialize
        >
          {(props) => {
            const {
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
            } = props;
            return (
              <Form>
                <Grid container className="container-shadow">
                  <Grid item lg={12} sm={12} md={6} xl={12}>
                    <div className="input-area mb-3">
                      <div className="field-1">
                        <AutocompleteInputs
                          id="type"
                          name="type"
                          label="Type*"
                          optionLabel="title"
                          onBlur={handleBlur}
                          value={values.type}
                          options={typeDropDown}
                          error={errors.type && touched.type}
                          onChange={handleAutoComplete("type", setFieldValue)}
                          helperText={
                            errors.type && touched.type && errors.type
                          }
                        />
                      </div>
                      <div className="field-8">
                        <CustomSwitch
                          name="status"
                          label="Status*"
                          labelPlacement="start"
                          checked={values.status}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="field-2">
                        <TextFieldInputs
                          name="name"
                          label="Name*"
                          value={values.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errors.name && touched.name}
                          helperText={
                            errors.name && touched.name && errors.name
                          }
                        />
                      </div>
                      <div className="field-3">
                        <TextFieldInputs
                          name="addressLine1"
                          label="Address Line 1*"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.addressLine1}
                          error={errors.addressLine1 && touched.addressLine1}
                          helperText={
                            errors.addressLine1 &&
                            touched.addressLine1 &&
                            errors.addressLine1
                          }
                        />
                      </div>
                      <div className="field-4">
                        <TextFieldInputs
                          name="addressLine2"
                          label="Address Line 2"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.addressLine2}
                          error={errors.addressLine2 && touched.addressLine2}
                          helperText={
                            errors.addressLine2 &&
                            touched.addressLine2 &&
                            errors.addressLine2
                          }
                        />
                      </div>
                      <div className="field-5">
                        <AutocompleteInputs
                          id="county"
                          name="county"
                          label="County*"
                          optionLabel="name"
                          onBlur={handleBlur}
                          value={values.county}
                          options={state.countyOption}
                          onChange={handleAutoComplete("county", setFieldValue)}
                          error={errors.county && touched.county}
                          helperText={
                            errors.county && touched.county && errors.county
                          }
                        />
                      </div>
                      <div className="field-6">
                        <AutocompleteInputs
                          id="cityId"
                          name="cityId"
                          label="City*"
                          optionLabel="name"
                          onBlur={handleBlur}
                          value={values.cityId}
                          options={state.cityOption}
                          error={errors.cityId && touched.cityId}
                          onChange={handleAutoComplete("cityId", setFieldValue)}
                          helperText={
                            errors.cityId && touched.cityId && errors.cityId
                          }
                        />
                      </div>
                      <div className="field-7">
                        <TextFieldInputs
                          id="zipcode"
                          name="zipcode"
                          label="Zip Code*"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.zipcode}
                          error={errors.zipcode && touched.zipcode}
                          helperText={
                            errors.zipcode && touched.zipcode && errors.zipcode
                          }
                        />
                      </div>

                      <div className="field-9">
                        <TextFieldInputs
                          id="contactPerson"
                          name="contactPerson"
                          value={values.contactPerson}
                          label="Contact Person Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errors.contactPerson && touched.contactPerson}
                          helperText={
                            errors.contactPerson &&
                            touched.contactPerson &&
                            errors.contactPerson
                          }
                        />
                      </div>
                      <div className="field-10">
                        <TextFieldInputs
                          id="phone"
                          name="phone"
                          value={values.phone}
                          label="Phone number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errors.phone && touched.phone}
                          helperText={
                            errors.phone && touched.phone && errors.phone
                          }
                        />
                      </div>
                      <div className="field-11">
                        <TextFieldInputs
                          id="email"
                          name="email"
                          label="E-mail ID"
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errors.email && touched.email}
                          helperText={
                            errors.email && touched.email && errors.email
                          }
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <div className="ModalBtn-group">
                  <Button type="submit">{values.btnText}</Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </WarehouseModalStyles>
    </CustomModal>
  );
};

export default AddWarehouse;
