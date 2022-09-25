import React from "react";
import style from "./StatusBarRed.module.scss";

export default function StatusBarRed(props) {
  return (
    <div className={props.classStyle == "slim" ? style.statusBarRedSlim : style.statusBarRed}>
      {props.children}
    </div>
  );
} 