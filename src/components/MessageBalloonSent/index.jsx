import React from "react";
import { Button } from "react-bootstrap";
import style from "./MessageBalloonSent.module.scss";

export default function MessageBalloonSent(props) {
  return (
    // <Button type={props.type} className={style.chatButton} onClick={props.onClick}>
    //   {props.children}
    // </Button>

    <div className={style.boxMessage}>
      {props.message}
     
    </div>
  );
}