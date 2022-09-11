import React from "react";
import style from "./BoxChild.module.scss";
import { BsPencil } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

export default function BoxChild(props) {
  return (
    <div className={style.boxChild}>
      <a href={props.urlProject} className={style.title}>
        <span>{props.children}</span>
      </a>
      <div className={style.config}>
        <a href={props.urlConfigProject}>
        <FiSettings className={style.icon} />
        </a>
      </div>
    </div>
  );
} 