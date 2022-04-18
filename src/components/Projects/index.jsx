import React from "react";
import { Form } from "react-bootstrap";
import style from "./Projects.module.scss";

import LinkButton from "../LinkButton";
import ListProjects from "../ListProjects";

export default function Projects() {
  return (
    <div className={style.containerProjects}>
      <h1 className={style.title}>Projetos</h1>

      <div className={style.projects}>
        <div className={style.menuClassAndProject}>
          <Form.Select size="sm" className={style.selectForm} data-testid="formSelect">
            <option>Selecione a turma</option>
            <option value="1">7A</option>
            <option value="2">2B</option>
            <option value="3">3A</option>
          </Form.Select>

          <LinkButton url="/create-project" classStyle="purple">Criar projeto</LinkButton>
        </div>

        <ListProjects/>
      </div>
    </div>
  );
}