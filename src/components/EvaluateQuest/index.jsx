import React from "react";
import style from "./EvaluateQuest.module.scss";
import { Table } from "react-bootstrap";

import LinkButton from "../LinkButton";
import CardQuest from "../CardQuest";
import TableTask from "../TableTask";

export default function EvaluateQuest() {
  return (
    <div className={style.containerQuest}>
      <h1 className={style.title}>Avaliar Quest</h1>

      <div className={style.quest}>
        <CardQuest/>
      </div>

      <TableTask/>

      <LinkButton url="/quest-management">Voltar</LinkButton>
    </div>
  );
}