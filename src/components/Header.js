import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Header = (props) => {
  const onClick = (e) => {
    console.log(e);
  };
  return (
    <header className="header">
      <h1>{props.title}</h1>
      <Button
        color={props.showAdd ? "red" : "green"}
        text={props.showAdd ? "Close" : "Add"}
        onClick={props.onAdd}
      />
      {/* {props.showAddTask} */}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
