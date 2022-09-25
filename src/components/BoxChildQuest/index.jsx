import React from "react";
import style from "./BoxChildQuest.module.scss";
import { FiSettings } from "react-icons/fi";

export default function BoxChildQuest(props) {
  return (
    <div className={style.boxChild}>
      
      <span className={style.title}>{props.children}</span>
    
      <div className={style.data}>
        <span class="mb-2">Date de entrega </span>
        <span>{props.dataEntrega}</span>
      </div>
      <div className={style.config}>
        <a href={props.urlQuest}>
        <FiSettings className={style.icon} />
        </a>
      </div>
    </div>
  );
} 