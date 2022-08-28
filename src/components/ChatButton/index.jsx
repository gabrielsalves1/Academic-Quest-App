import React from "react";
import { Button } from "react-bootstrap";
import style from "./ChatButton.module.scss";

export default function ChatButton(props) {
  return (
    <button type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
}