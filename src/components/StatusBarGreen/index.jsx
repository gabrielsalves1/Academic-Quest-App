import React from "react";
import style from "./StatusBarGreen.module.scss";

export default function StatusBarGreen(props) {
  return (
    <div className={props.classStyle == "slim" ? style.statusBarGreenSlim : style.statusBarGreen}>
      {props.children}
    </div>
  );
} 