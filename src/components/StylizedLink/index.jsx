import React from "react";
import style from "./StylizedLink.module.scss";

export default function StylizedLink(props) {
  return (
    <a href={props.href} className={style.stylizedLink}>
      {props.children}
    </a>
  );
}