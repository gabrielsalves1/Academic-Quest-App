import React from "react";
import style from "./BoxChildQuest.module.scss";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function BoxChildQuest(props) {
  return (
    <div className={style.boxChild}>

      <span className={style.title}>{props.children}</span>

      <div className={style.data}>
        <span className="mb-2">Data de entrega </span>
        <span>{props.dataEntrega}</span>
      </div>
      <div className={style.config}>
        <Link to={props.urlQuest}>
          <BsPencilSquare className={style.icon} />
        </Link>
      </div>
    </div>
  );
} 