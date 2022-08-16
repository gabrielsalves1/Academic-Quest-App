import React from "react";
import style from "./StylizedA.module.scss";

export default function StylizedA(props) {
  return (
    <a href={props.href} className={style.stylizedA}>
      {props.children}
    </a>
  );
}