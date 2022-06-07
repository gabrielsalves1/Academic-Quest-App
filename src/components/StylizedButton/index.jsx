import React from "react";
import { Button } from "react-bootstrap";
import style from "./SubmitButton.module.scss";

export default function StylizedButton(props) {
  return (
    <Button type={props.type} className={style.buttonForm} onClick={props.onClick}>
      {props.children}
    </Button>
  );
}