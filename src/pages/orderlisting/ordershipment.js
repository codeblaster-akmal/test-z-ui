import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { OrderShipmentStyles } from "./orderlistingstyles";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";
import CustomModal from "../../components/customModal";
import {
  AutocompleteInputs,
  TextFieldInputs,
  DateTimePickerWrapper,
  Button,
} from "components";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";

const dropdownOptions = [
  { title: "Option 1" },
  { title: "Option 2" },
  { title: "Option 3" },
];

const initialValues = {
  suborderno: "",
  logisticpartner: "",
  trackingno: "",
  shipmentdate: "",
  expecteddelivery: "",
};

const validationSchema = Yup.object({
  suborderno: Yup.string().required("Required"),
  logisticpartner: Yup.string().required("Required"),
  trackingno: Yup.number().required("Required"),
  shipmentdate: Yup.date().required("Required"),
  expecteddelivery: Yup.date().required("Required"),
});

function OrderShipment({ open, handleClose }) {  

  const handleAutoComplete = (name, setFieldValue) => (e, value) => {
    setFieldValue(name, value !== null ? value : initialValues[name]);
  };

  const onSubmitHandler = (values) => {
    console.log(values);
  };

  return (
    <CustomModal open={open} FadeIn={open} onClose={handleClose}>
      <OrderShipmentStyles>
        <div className="title-section">
          <div className="modal-title">Order Shipment</div>
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
                <div className="shipment">
                  <div className="inputs">
                    <TextFieldInputs
                      name="suborderno"
                      placeholder="SubOrder No"
                      disabled
                      value={values.suborderno}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={errors.suborderno && touched.suborderno}
                      helperText={
                        errors.suborderno &&
                        touched.suborderno &&
                        errors.suborderno
                      }
                    />
                  </div>
                  <div className="inputs">
                    <AutocompleteInputs
                      label="Logistics Partner*"
                      options={dropdownOptions}
                      optionLabel="title"
                      name="logisticpartner"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={errors.logisticpartner && touched.logisticpartner}
                      helperText={
                        errors.logisticpartner &&
                        touched.logisticpartner &&
                        errors.logisticpartner
                      }
                    />
                  </div>
                  <div className="inputs">
                    <TextFieldInputs
                      name="trackingno"
                      label="Tracking Number*"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={errors.trackingno && touched.trackingno}
                      helperText={
                        errors.trackingno &&
                        touched.trackingno &&
                        errors.trackingno
                      }
                    />
                  </div>
                  <Grid container spacing={2} className="date">
                    <Grid item xs={6}>
                      <div className="inputs">
                        <DateTimePickerWrapper>
                          <KeyboardDateTimePicker
                            variant="inline"
                            fullWidth
                            ampm={false}
                            hideTabs
                            autoOk
                            placeholder="Shipment Date"
                            name="shipmentdate"
                            onBlur={handleBlur}
                            error={errors.shipmentdate && touched.shipmentdate}
                            helperText={
                              errors.shipmentdate &&
                              touched.shipmentdate &&
                              errors.shipmentdate
                            }
                            value={values.fromDate}
                            onChange={handleAutoComplete(
                              "shipmentdate",
                              setFieldValue
                            )}
                            // format="yyyy/MM/dd HH:mm"
                          />
                        </DateTimePickerWrapper>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="inputs">
                        <DateTimePickerWrapper>
                          <KeyboardDateTimePicker
                            variant="inline"
                            fullWidth
                            ampm={false}
                            hideTabs
                            autoOk
                            placeholder="Expected Delivery"
                            name="expecteddelivery"
                            onBlur={handleBlur}
                            error={
                              errors.expecteddelivery &&
                              touched.expecteddelivery
                            }
                            helperText={
                              errors.expecteddelivery &&
                              touched.expecteddelivery &&
                              errors.expecteddelivery
                            }
                            value={values.fromDate}
                            onChange={handleAutoComplete(
                              "expecteddelivery",
                              setFieldValue
                            )}
                            // format="yyyy/MM/dd HH:mm"
                          />
                        </DateTimePickerWrapper>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div className="submit-button">
                  <Button type="submit">ADD</Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </OrderShipmentStyles>
    </CustomModal>
  );
}

export default OrderShipment;
