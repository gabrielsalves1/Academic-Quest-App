import React from "react";
import { Button } from "react-bootstrap";
import style from "./MessageBalloonIncoming.module.scss";

export default function MessageBalloonIncoming(props) {
  return (
    <div className={style.boxMessage}>
      {props.message}
    </div>
  );
}