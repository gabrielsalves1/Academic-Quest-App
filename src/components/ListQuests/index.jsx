import React from "react";
import { Form } from "react-bootstrap";
import style from "./ListQuests.module.scss";

import LinkButton from "../LinkButton";
import CardQuest from "../CardQuest";

export default function ListQuests() {
  return (
    <div className={style.listQuests}>
      <div className={style.menuCreateQuest}>
        <LinkButton to="/projects">Voltar</LinkButton>
        <Form.Select size="sm" className={style.selectForm} data-testid="formSelect">
          <option>Ordem de Exibição</option>
          <option value="1">Recentes</option>
          <option value="2">Finalizados</option>
        </Form.Select>

        <LinkButton to="/create-quest" classStyle="purple">Criar</LinkButton>
      </div>

      <ul>
        <CardQuest/>
        <CardQuest/>
      </ul>
    </div>
  );
}