import React from "react";
import { Form } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import style from "./ListQuests.module.scss";

import LinkButton from "../LinkButton";

export default function ListQuests() {
  return (
    <div className={style.listQuests}>
      <div className={style.menuCreateQuest}>
        <LinkButton url="/">Voltar</LinkButton>
        <Form.Select size="sm" className={style.selectForm} data-testid="formSelect">
          <option>Ordem de Exibição</option>
          <option value="1">Recentes</option>
          <option value="2">Finalizados</option>
        </Form.Select>

        <LinkButton url="/create-quest" classStyle="purple">Criar</LinkButton>
      </div>

      <ul>
        <li className={style.quest}>
          <LinkButton url="/">Desenvolver introdução</LinkButton>
          <span className={style.active}>Aberto</span>
          <BsPencilSquare className={style.icone}/>
          <BsTrash className={style.icone}/>
        </li>
        <li className={style.quest}>
          <LinkButton url="/">Desenvolver introdução</LinkButton>
          <span className={style.active}>Aberto</span>
          <BsPencilSquare className={style.icone}/>
          <BsTrash className={style.icone}/>
        </li>
      </ul>
    </div>
  );
}