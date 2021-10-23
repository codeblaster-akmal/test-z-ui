import React from "react";
import {
  makeStyles,
  Grid,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import "./login.scss";
import Button from "components/button";
import { Link } from "react-router-dom";

//!  Don't remove this comments

// import Cookie from 'js-cookie';

// Cookie.set('refreshToken', res.refresh_token, {
//   expires: 7
// })

// localStorage.setItem('isLogin', true)

// Cookie.remove('refreshToken')
// localStorage.removeItem('isLogin')

const Login = () => {
  const useStyles = makeStyles((theme) => ({
    leftColumn: {
      // backgroundColor: theme.palette.primary.main,
      backgroundColor: "hsl(205, 21%, 76%)",
      height: "100vh",
    },
    rightColumn: {
      display: "flex",
      backgroundColor: theme.palette.primary.contrastText,
    },
    goldBanktitle: {
      fontSize: 24,
      color: theme.palette.primary.contrastText,
      fontWeight: 800,
    },
  }));

  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid
          item
          xs={6}
          md={6}
          lg={6}
          xl={6}
          className={classes.leftColumn}
          spacing={5}
        >
          <div className={classes.goldBanktitle}>{/* GBDC */}</div>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          lg={6}
          xl={6}
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
          className={classes.rightColumn}
        ></Grid>
      </Grid>
      <LoginBox />
    </div>
  );
};

function LoginBox() {
  return (
    <div className="login-page-design">
      <Grid
        container
        spacing={8}
        direction="row"
        justify="center"
        alignItems="center"
        className="loginFieldsposition"
      >
        <Grid
          item
          xs={3}
          md={3}
          lg={3}
          xl={3}
          className="inputFieldsbackgroundColor"
        >
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <div className="loginTitle">LOGIN</div>
            <div className="login-border-bottom"></div>
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <FormControl className="inputWidth">
              <InputLabel htmlFor="standard-adornment-password">
                Username
              </InputLabel>
              <Input
                endAdornment={
                  <InputAdornment position="end">
                    <PermIdentityOutlinedIcon className="inputIconcolor inputIcon-on-focus" />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <FormControl className="inputWidth">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                endAdornment={
                  <InputAdornment position="end">
                    <LockOpenOutlinedIcon className="inputIconcolor" />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Link to="/forgotPassword">Forgot Password ?</Link>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            xl={12}
            className="loginButtonposition"
          >
            <Button variant="buttonprimary" type="button" className="login-btn">
              <span className="btn-wrapper--label">LOGIN</span>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
