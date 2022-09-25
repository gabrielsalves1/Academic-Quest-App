import React from "react";
import style from "./BoxResult.module.scss";

export default function BoxResult(props) {
  return (
    <div className={style.boxResult}>
      { props.children }
    </div>
  );
}