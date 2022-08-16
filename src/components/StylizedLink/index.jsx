import React from "react";
import { Link } from "react-router-dom";
import style from "./StylizedLink.module.scss";

export default function StylizedLink(props) {
  return (
    <Link to={props.to} className={style.stylizedLink}>
      {props.children}
    </Link>
  );
}