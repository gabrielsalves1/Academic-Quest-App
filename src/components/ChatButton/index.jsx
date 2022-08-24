import React from "react";
import { Button } from "react-bootstrap";
import style from "./ChatButton.module.scss";

export default function ChatButton(props) {
  return (
    <Button type={props.type} className={style.chatButton} onClick={props.onClick}>
      {props.children}
    </Button>
  );
}