import React from "react";
import style from "./StatusBarGray.module.scss";

export default function StatusBarGray(props) {
  return (
    <div className={props.classStyle == "slim" ? style.statusBarGraySlim : style.statusBarGray}>
      {props.children}
    </div>
  );
} 