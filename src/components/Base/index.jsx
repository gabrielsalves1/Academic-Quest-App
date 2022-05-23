import React from "react";
import style from "./Base.module.scss";

export default function Base(props) {
  return (
    <div className={style.base}>
      { props.children }
    </div>
  );
}