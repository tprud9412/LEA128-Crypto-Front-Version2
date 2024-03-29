import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Collapse,
  lighten,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "3px auto",
    borderRadius: "8px",
    transition: "all .5s",
    overflow: "hidden",
  },
  listItem: {
    transition: "all .5s",
    display: "flex",
    flexDirection: "column",
  },
  listLink: {
    padding: "0 10px",
    textDecoration: "none",
    color: "inherit",
    transition: "all .5s",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  listLinkCollapsed: {
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7),
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  listIcon: {
    color: "inherit",
    justifyContent: "center",
  },
  listItemText: {
    [theme.breakpoints.up("sm")]: {
      fontSize: 9,
    },
  },
  expanded: {
    backgroundColor: lighten(theme.palette.secondary.main, 0.2),
  },
  selected: {
    backgroundColor: lighten(theme.palette.secondary.main, 0.5),
  },
}));

const NavigationItem = ({ item, collapsed }) => {
  const { pathname } = useLocation();
  const classes = useStyles();

  // If navigation is nested
  const [open, setOpen] = React.useState(false);
  const nested = typeof item.navigationData == "object" ? true : false;

  const handleClick = () => {
    setOpen(!open);
  };

  // Persisting the nested navigation open state on page refresh
  React.useEffect(() => {
    if (pathname.search(new RegExp(item.url, "g")) !== -1) {
      setOpen(true);
    }
  }, [pathname, item.url]);

  return (
    <div
      className={clsx(
        classes.root,
        nested && open && classes.expanded,
        pathname.search(new RegExp(item.url, "g")) !== -1 &&
          !nested &&
          classes.selected
      )}
    >
      <ListItem
        button
        className={clsx(classes.listItem)}
        onClick={handleClick}
        disableGutters
      >
        <Box
          component={!nested ? Link : "div"}
          to={`${item.url}`}
          className={clsx(
            classes.listLink,
            collapsed && classes.listLinkCollapsed
          )}
        >
          <ListItemIcon className={classes.listIcon}>
            {(item.icon && <item.icon />) || ""}
          </ListItemIcon>
          <ListItemText
            classes={{ primary: collapsed ? classes.listItemText : "" }}
          >
            {item.name}
          </ListItemText>
          {nested &&
            (open ? (
              <ExpandLess fontSize={collapsed ? "inherit" : "medium"} />
            ) : ( 
              <ExpandMore fontSize={collapsed ? "inherit" : "medium"} />
            ))}
        </Box>
      </ListItem>

      {nested && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.navigationData.map((nestedItem, i) => {
              return (
                <NavigationItem
                  key={i}
                  item={nestedItem}
                  collapsed={collapsed}
                />
              );
            })}
          </List>
        </Collapse>
      )}
    </div>
  );
};

export default NavigationItem;

NavigationItem.propTypes = {
  item: PropTypes.object.isRequired,
  collapsed: PropTypes.bool,
};
