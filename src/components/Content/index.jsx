import React from "react";
import style from "./Content.module.scss";

export default function Content(props) {
  return (
    <div className={style.content}>
      { props.children }
    </div>
  );
}