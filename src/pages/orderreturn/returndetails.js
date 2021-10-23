import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { ReturnDetailsStyles } from "./orderreturnstyles";
import {
  AutocompleteInputs,
  CustomModal,
  TextFieldInputs,
  Button,
} from "../../components";
import { condition } from "./orderreturnData";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";

const initialValues = {
  orderid: "",
  logisticpartner: "",
  dispatchdate: "",
  orderitemid: "",
  trackingnumber: "",
  condition: "",
};

const validationSchema = Yup.object({
  orderid: Yup.string().required("Required"),
  logisticpartner: Yup.string().required("Required"),
  dispatchdate: Yup.date().required("Required"),
  orderitemid: Yup.string().required("Required"),
  trackingnumber: Yup.string().required("Required"),
  condition: Yup.string().required("Required"),
});

function ReturnDetails({ open, handleClose }) {
  const handleAutoComplete = (name, setFieldValue) => (e, value) => {
    setFieldValue(
      name,
      value !== null ? value : initialValues[name]
    );
  };

  const onSubmitHandler = (values) => {
    console.log(values);
  };

  return (
    <CustomModal open={open} FadeIn={open} onClose={handleClose}>
      <ReturnDetailsStyles>
        <div className="title-section">
          <div className="modal-title">Return Confirmation</div>
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
                <div className="return">
                  <Grid container xs={12} spacing={3}>
                    <Grid item xs={6}>
                      <div className="input-grid">
                        <div className="inputs">
                          <TextFieldInputs
                            label="Order Id"
                            disabled
                            defaultValue="aaaa"
                            name="orderid"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.orderid}
                            error={errors.orderid && touched.orderid}
                            helperText={
                              errors.orderid &&
                              touched.orderid &&
                              errors.orderid
                            }
                          />
                        </div>
                        <div className="inputs">
                          <TextFieldInputs
                            label="Logistic Partner"
                            disabled
                            defaultValue="aaaa"
                            name="logisticpartner"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.logisticpartner && touched.logisticpartner
                            }
                            helperText={
                              errors.logisticpartner &&
                              touched.logisticpartner &&
                              errors.logisticpartner
                            }
                          />
                        </div>
                        <div className="inputs">
                          <TextFieldInputs
                            label="Dispatch Date"
                            disabled
                            defaultValue="aaaa"
                            name="dispatchdate"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.dispatchdate && touched.dispatchdate}
                            helperText={
                              errors.dispatchdate &&
                              touched.dispatchdate &&
                              errors.dispatchdate
                            }
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="input-grid">
                        <div className="inputs">
                          <TextFieldInputs
                            label="Order item Id"
                            disabled
                            defaultValue="aaaa"
                            name="orderitemid"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.orderitemid && touched.orderitemid}
                            helperText={
                              errors.orderitemid &&
                              touched.orderitemid &&
                              errors.orderitemid
                            }
                          />
                        </div>
                        <div className="inputs">
                          <TextFieldInputs
                            label="Tracking Number"
                            disabled
                            defaultValue="aaaa"
                            name="trackingnumber"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              errors.trackingnumber && touched.trackingnumber
                            }
                            helperText={
                              errors.trackingnumber &&
                              touched.trackingnumber &&
                              errors.trackingnumber
                            }
                          />
                        </div>
                        <div></div>
                      </div>
                    </Grid>
                  </Grid>
                  <div className="condition-grid">
                    <div className="inputs end">
                      Product Condition &nbsp;&nbsp;:
                    </div>
                    <div className="inputs">
                      <AutocompleteInputs
                        label="Select Condition"
                        optionLabel="title"
                        options={condition}
                        name="condition"
                        onBlur={handleBlur}
                        onChange={handleAutoComplete(
                          "condition",
                          setFieldValue
                        )}
                        error={errors.condition && touched.condition}
                        helperText={
                          errors.condition &&
                          touched.condition &&
                          errors.condition
                        }
                      />
                    </div>
                  </div>
                  <div className="submit-button">
                    <Button type="submit">Received</Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </ReturnDetailsStyles>
    </CustomModal>
  );
}

export default ReturnDetails;
