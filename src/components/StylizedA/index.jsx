import React from "react";
import style from "./StylizedA.module.scss";
import { Link } from "react-router-dom";

export default function StylizedA(props) {
  return (
    <Link to={props.href} className={style.stylizedA}>
      {props.children}
    </Link>
  );
}