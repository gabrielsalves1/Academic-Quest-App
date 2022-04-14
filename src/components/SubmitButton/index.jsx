import React from "react";
import { Button } from "react-bootstrap";
import style from "./SubmitButton.module.scss";

export default function SubmitButton(props) {
  return (
    <Button type="submit" className={style.buttonForm}>
      {props.children}
    </Button>
  );
}