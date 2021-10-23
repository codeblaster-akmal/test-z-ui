import React from "react";
import { matchPath } from "react-router-dom";
import PropTypes from "prop-types";
import { List, Typography } from "@material-ui/core";
import useRouter from "utils/useRouter";
import SidebarMenuListItem from "./SidebarMenuListItem";
const SidebarMenuList = (props) => {
  const { pages, expand, ...rest } = props;

  return (
    <List className="p-0">
      {pages.reduce(
        (items, page) => reduceChildRoutes({ items, expand, page, ...rest }),
        []
      )}
    </List>
  );
};

SidebarMenuList.propTypes = {
  depth: PropTypes.number,
  pages: PropTypes.array,
};

const reduceChildRoutes = (props) => {
  const { router, expand, items, page, depth } = props;

  if (page.content) {
    const open = matchPath(router.location.pathname, {
      path: page.to,
      exact: false,
    });

    items.push(
      <SidebarMenuListItem
        depth={depth}
        icon={page.icon}
        key={page.label}
        label={page.badge}
        open={Boolean(open)}
        title={page.label}
        expand={expand}
      >
        <div className="sidebar-menu-children py-2">
          <SidebarMenuList
            depth={depth + 1}
            pages={page.content}
            router={router}
            expand={expand}
          />
        </div>
      </SidebarMenuListItem>
    );
  } else {
    items.push(
      <SidebarMenuListItem
        depth={depth}
        href={page.to}
        icon={page.icon}
        key={page.label}
        label={page.badge}
        title={page.label}
        expand={expand}
      />
    );
  }

  return items;
};

const SidebarMenu = (props) => {

  const { title, pages, className, component: Component, expand, ...rest } = props;

  const router = useRouter();

  return (
    <Component {...rest} className={className}>
      {title && (
        <Typography className="app-sidebar-heading">{title}</Typography>
      )}
      <SidebarMenuList depth={0} pages={pages} router={router} expand={expand}/>
    </Component>
  );
};



SidebarMenu.propTypes = {
  className: PropTypes.string,
  component: PropTypes.any,
  pages: PropTypes.array.isRequired,
  title: PropTypes.string,
};

SidebarMenu.defaultProps = {
  component: "nav",
};

export default SidebarMenu;
