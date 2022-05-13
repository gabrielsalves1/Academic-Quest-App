import React from "react";
import { Form } from "react-bootstrap";
import style from "./Groups.module.scss";

import LinkButton from "../../components/LinkButton";

export default function Groups() {
  return (
    <div className={style.containerGroups}>
      <h1 className={style.title}>Grupos</h1>

      <div className={style.groups}>
        <div className={style.menuClassAndGroup}>
          <Form.Select size="sm" className={style.selectForm} data-testid="formSelect">
            <option>Selecione a turma</option>
            <option value="1">7A</option>
            <option value="2">2B</option>
            <option value="3">3A</option>
          </Form.Select>

          <LinkButton to="/create-group" classStyle="purple">Criar grupo</LinkButton>
        </div>

      </div>
    </div>
  );
}