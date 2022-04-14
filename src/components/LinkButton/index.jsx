import React from "react";
import { Link } from "react-router-dom";
import style from "./LinkButton.module.scss";

export default function LinkButton(props) {
  return (
    <Link to={props.url} className={`${props.classStyle === 'purple' ? style.linkPurple : style.link }`}>
      {props.children}
    </Link>
  );
} 