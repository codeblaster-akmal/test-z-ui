import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import ForgotPasswordStyles from "./forgotPasswordStyles";
import { Button, TextFieldInputs } from "components";
import { InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Required"),
});

const ForgotPassword = () => {
  const [passwordValues, setValues] = useState({
    showPassword: false,
    reTypeshowPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...passwordValues,
      showPassword: !passwordValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowReTypePassword = () => {
    setValues({
      ...passwordValues,
      reTypeshowPassword: !passwordValues.reTypeshowPassword,
    });
  };

  const handleMouseDownReTypePassword = (event) => {
    event.preventDefault();
  };
  const onSubmitHandler = async (values) => {
    try {
      await console.log(`values`, values);
    } catch (error) {
      console.log(`error`, error);
    }
  };
  return (
    <>
      <ForgotPasswordStyles>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitHandler}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
            } = props;
            return (
              <Form>
                <div className="createPasswordBodyBgColor">
                  <div className="createPasswordRow">
                    <div className="passwordCardColumn">
                      <div className="changePasswordTitle">Forget Password</div>
                      <div className="userName">{"John doe"}</div>
                      <div className="passwordInput">
                        <TextFieldInputs
                          type={
                            passwordValues.showPassword ? "text" : "password"
                          }
                          name="password"
                          label="Password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errors.password && touched.password}
                          helperText={
                            errors.password &&
                            touched.password &&
                            errors.password
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {values.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </div>
                      <div className="passwordInput">
                        <TextFieldInputs
                          name="confirmPassword"
                          label="Confirm Password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            errors.confirmPassword && touched.confirmPassword
                          }
                          type={
                            passwordValues.reTypeshowPassword
                              ? "text"
                              : "password"
                          }
                          helperText={
                            errors.confirmPassword &&
                            touched.confirmPassword &&
                            errors.confirmPassword
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowReTypePassword}
                                onMouseDown={handleMouseDownReTypePassword}
                              >
                                {values.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <div className="setPasswordTitle">
                          Set a password with atleast 8 characters with a
                          combination of numbers, uppercase, lowercase, special
                          character and no spaces.
                        </div>
                        <div className="passwordButtonAlingment">
                          <Button type="submit" disabled={isSubmitting}>
                            Reset Password
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </ForgotPasswordStyles>
    </>
  );
};

export default ForgotPassword;
