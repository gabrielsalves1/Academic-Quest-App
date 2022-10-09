import React from "react";
import style from "./BoxChild.module.scss";
import { BsPencilSquare } from "react-icons/bs";
import StylizedLink from "../StylizedLink";

export default function BoxChild(props) {
  return (
    <div className={style.boxChild}>
      <StylizedLink to={props.urlProject} className={style.title}>
        <span>{props.children}</span>
      </StylizedLink>
      <div className={style.config}>
        <StylizedLink to={props.urlConfigProject}>
          <BsPencilSquare className={style.icon} />
        </StylizedLink>
      </div>
    </div>
  );
} 