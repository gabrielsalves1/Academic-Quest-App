import React from "react";
import style from "./StatusBarYellow.module.scss";

export default function StatusBarYellow(props) {
  return (
    <div className={props.classStyle == "slim" ? style.statusBarYellowSlim : style.statusBarYellow}>
      {props.children}
    </div>
  );
} 