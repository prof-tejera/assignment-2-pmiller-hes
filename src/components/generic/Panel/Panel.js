import React from "react";
import "./Panel.css";


const Panel =  ({ className, ...props })  => {
  return <div className={'default-panel ' + className}>{props.children}</div>;
};

export default Panel;
