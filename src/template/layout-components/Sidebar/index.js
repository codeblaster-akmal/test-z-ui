import React, { Fragment, useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Hidden, Drawer, Paper } from "@material-ui/core";
import { connect } from "react-redux";
// import SidebarHeader from "../../layout-components/SidebarHeader";
import SidebarMenu from "../SidebarMenu";
import navItems from "./navItems";
import { setSidebarToggleMobile } from "../../reducers/ThemeOptions";
import "./sidebar.scss";


const SidebarMenuContent = (props) => {
  return(<div>
    {navItems.map((list) => (
      <SidebarMenu
        component="div"
        key={list.label}
        pages={list.content}
        title={list.label}
        {...props}
      />
    ))}
  </div>) 
};

const Sidebar = (props) => {
  const {
    setSidebarToggleMobile,
    sidebarToggleMobile,
    sidebarFixed,
    sidebarShadow,
  } = props;

  const [expand, setExpand] = useState(false);

  // const theme = useTheme();
  const closeDrawer = () => setSidebarToggleMobile(!sidebarToggleMobile);
  const menuBg = {
    // backgroundColor: theme.palette.primary.main,
    backgroundColor:"white"
  };

  return (
    <Fragment>
      <div className="sidebar-on-hover-width">
        <Hidden lgUp>
          <Drawer
            anchor="left"
            open={sidebarToggleMobile}
            onClose={closeDrawer}
            variant="temporary"
            elevation={4}
            className={"app-sidebar-wrapper-lg"}
          >
            {/* <SidebarHeader /> */}
            <PerfectScrollbar><SidebarMenuContent expand={expand}/></PerfectScrollbar>
          </Drawer>
        </Hidden>

        <Hidden mdDown>
          <Paper
            className={clsx("app-sidebar-wrapper", {
              "app-sidebar-wrapper-fixed": sidebarFixed,
              "width15": expand
            })}
            onMouseEnter={() => setExpand(true)}
            onMouseLeave={() => setExpand(false)}
            square
            elevation={sidebarShadow ? 11 : 3}
          >
            {/* <SidebarHeader /> */}
            <div
              style={menuBg}
              className={clsx({
                "app-sidebar-menu": sidebarFixed
              })}
            >
              <PerfectScrollbar options={{ wheelPropagation: false }}>
              <SidebarMenuContent expand={expand}/>
              </PerfectScrollbar>
            </div>
          </Paper>
        </Hidden>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  sidebarFixed: state.ThemeOptions.sidebarFixed,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
