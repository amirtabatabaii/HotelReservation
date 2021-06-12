import React from "react";
import { Input } from "antd";

function inputBox(props) {
  return (
    <>
      <label>{props.label}</label>
      <Input
        placeholder={props.placeholder}
        name={props.name}
        type={props.type}
        pattern={props.pattern}
        onChange={props.handelInputChange}
        maxLength={props.maxLength}
        value={props.value}
      />
    </>
  );
}

export default inputBox;
