import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import style from "./ListGroups.module.scss";

import api from "../../service/api";

export default function ListGroups(props) {
  const [ groups, setGroups ] = useState();

  async function getGroups(id) {
    const response = await api.get(`/grupos/materia/${id}`);
    setGroups(response.data);
    console.log(response.data);
  }

  return (
    <>
      <ul className={style.listSubject} data-testid="listSubject">
        {
          props.subjects?.map((subject) => (
            <li key={subject.id} className={style.subjectItem}>
              <span onClick={() => { getGroups(subject.id) }}>{subject.nome}</span>
            </li>
          ))
        }
      </ul>

      {
        groups &&
        <Table className={style.table} data-testid="tableGroups">
          <thead className={style.header}>
            <tr>
              <th>Grupos</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              groups?.map((group) => (
                <tr className={style.line} key={group.id}>
                  <td>{group.nome}</td>
                  <td><BsPencilFill/></td>
                  <td><BsFillTrashFill/></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      }
    </>
  );
}