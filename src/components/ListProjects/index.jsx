import React from "react";
import style from "./ListProjects.module.scss";
import { BsFillFileTextFill, BsPencil } from "react-icons/bs";

import LinkButton from "../LinkButton";

export default function ListProjects() {
  return (
    <>
      <div className={style.title}>
        <h3>Projeto</h3>
        <h3>Status</h3>
        <h3>Quest</h3>
      </div>

      <ul>
        <li className={style.project}>
            <LinkButton to="/projects" classStyle="purple">
              <BsFillFileTextFill className={style.icon}/>TCC 1
            </LinkButton>

            <span className={style.active}>Ativo</span>
            <LinkButton to="/quest-management">
              <BsPencil className={style.icon}/>Gerenciar Quest
            </LinkButton>
        </li>
        <li className={style.project}>
            <LinkButton to="/projects" classStyle="purple">
              <BsFillFileTextFill className={style.icon}/>TCC 2
            </LinkButton>

            <span className={style.active}>Ativo</span>
            <LinkButton to="/quest-management">
              <BsPencil className={style.icon}/>Gerenciar Quest
            </LinkButton>
        </li>
      </ul>
    </>
  );
}