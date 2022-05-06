import React from "react";
import style from "./CardQuest.module.scss";

import LinkButton from "../LinkButton";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

export default function CardQuest() {
  return (
    <ul data-testid="listCardQuest">
      <li className={style.quest}>
        <LinkButton to="/evaluate-quest">Desenvolver introdução</LinkButton>
        <span className={style.active}>Aberto</span>
        <BsPencilSquare className={style.icone}/>
        <BsTrash className={style.icone}/>
      </li>
    </ul>
  );
}