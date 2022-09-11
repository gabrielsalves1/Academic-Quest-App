import React from "react";
import style from "./StatusBarGreen.module.scss";

export default function StatusBarGreen(props) {
  return (
    <div className={style.statusBarGreen}>
      {props.children}
    </div>
  );
} 