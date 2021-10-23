import React, { Fragment } from "react";
import clsx from "clsx";
import { Hidden, IconButton, AppBar, Box, Tooltip } from "@material-ui/core";
import { connect } from "react-redux";
import { setSidebarToggleMobile } from "../../reducers/ThemeOptions";
import { Link } from "react-router-dom";
import projectLogo from "../../../assets/images/logo/zabslogo.png";
import HeaderLogo from "../HeaderLogo";
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import "./header.scss";

const Header = (props) => {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const {
    headerShadow,
    headerFixed,
    sidebarToggleMobile,
    setSidebarToggleMobile,
  } = props;
  return (
    <Fragment>
      <div className="header-custom">
        <AppBar
          color="secondary"
          className={clsx("app-header", {})}
          position={headerFixed ? "fixed" : "absolute"}
          elevation={headerShadow ? 11 : 3}
        >
          {!props.isCollapsedLayout && <HeaderLogo />}
          <Box className="app-header-toolbar">
            <Hidden lgUp>
              <Box className="app-logo-wrapper" title="Gold Bank London">
                <Link to="/DashboardDefault" className="app-logo-link">
                  <IconButton
                    color="primary"
                    size="medium"
                    className="app-logo-btn"
                  >
                    <img
                      className="app-logo-img"
                      alt="Gold Bank London"
                      src={projectLogo}
                    />
                  </IconButton>
                </Link>
              </Box>
            </Hidden>
            <Hidden mdDown>
              <Box className="d-flex align-items-center"></Box>
            </Hidden>

            <Box className="d-flex align-items-center">

              <Box className="toggle-sidebar-btn-mobile">
                <Tooltip title="Toggle Sidebar" placement="right">
                  <IconButton
                    color="inherit"
                    onClick={toggleSidebarMobile}
                    size="medium"
                  >
                    {sidebarToggleMobile ? (
                      <MenuOpenRoundedIcon />
                    ) : (
                      <MenuRoundedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </AppBar>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
