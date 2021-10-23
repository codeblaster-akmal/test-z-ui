import React from "react";
import {
  Grid,
  Input,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import "./invitation.scss";

function Invitation() {
  return (
    <div>
      <div className="titleName">User registration</div>
      <div className="fieldsBackgroundcolor">
        <Grid container>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <FormControl className="inputWidth">
                <InputLabel htmlFor="standard-adornment-password">
                  Username
                </InputLabel>
                <Input />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <FormControl className="inputWidth">
                <InputLabel htmlFor="standard-adornment-password">
                  E-mail
                </InputLabel>
                <Input />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <FormControl className="inputWidth">
                <InputLabel htmlFor="standard-adornment-password">
                  Phone
                </InputLabel>
                <Input />
              </FormControl>
            </Grid>
            <Button variant="buttonprimary" type="button" className="register-btn">
              <span className="btn-wrapper--label">REGISTER</span>
            </Button>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            Hello
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Invitation;
