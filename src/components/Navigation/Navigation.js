import React from "react";
import PropTypes from "prop-types";
import { List, makeStyles } from "@material-ui/core";
import NavigationItem from "./components/NavigationItem";

const useStyles = makeStyles({
  list: {
    listStyle: "none",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(33, 122, 244, .1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#217af4",
      height: "30%",
      outline: "1px solid slategrey",
    },
  },
});

const Navigation = ({ data, collapsed }) => {
  const classes = useStyles();

  if (!Array.isArray(data)) return null;

  let renderData = data?.map((item, index) => {
    return <NavigationItem key={index} item={item} collapsed={collapsed} />;
  });

  return (
    <List className={classes.list} component="nav">
      {renderData}
    </List>
  );
};

export default Navigation;

Navigation.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  collapsed: PropTypes.bool,
};
