import React from "react";
import { Button } from "react-bootstrap";
import style from "./MessageBalloonIncoming.module.scss";

export default function MessageBalloonIncoming(props) {
  return (
    <>
    <div className={style.boxMessage}>
      <span className={style.nickName}>Recebida</span>
      <div className={style.balloon}>
        {props.message}
      </div>
    </div>
    </>
  );
}