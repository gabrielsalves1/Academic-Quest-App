import React from "react";
import style from "./MessageBalloonSent.module.scss";

export default function MessageBalloonSent(props) {
  return (
    <>
    <div className={style.boxMessage}>
      <span className={style.nickName}>{props.nickName}</span>
      <div className={style.balloon}>
        {props.message}
      </div>
    </div>
    </>
  );
}