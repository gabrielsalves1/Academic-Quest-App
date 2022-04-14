import React from "react";
import style from "./ListProjects.module.scss";
import { BsFillFileTextFill, BsPencil } from "react-icons/bs";

import LinkButton from "../LinkButton";

export default function ListProjects() {
  return (
    <table>
      <thead>
        <tr>
          <th className={style.title}>Projeto</th>
          <th className={style.title}>Status</th>
          <th className={style.title}>Quest</th>
        </tr>
      </thead>
      <tbody>
        <tr className={style.project}>
          <td>
            <LinkButton url="/" classStyle="purple">
              <BsFillFileTextFill/>TCC 1
            </LinkButton></td>
          <td className={style.active}>Ativo</td>
          <td>
            <LinkButton url="/">
              <BsPencil/>Gerenciar Quest
            </LinkButton>
          </td>
        </tr>
      </tbody>
    </table>
  );
}