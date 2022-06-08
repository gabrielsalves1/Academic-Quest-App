import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import style from "./ListGroups.module.scss";

import api from "../../service/api";

export default function ListGroups(props) {
  const [ groups, setGroups ] = useState();

  async function getGroups(id) {
    const response = await api.get(`/grupos/materia/${id}`);
    setGroups(response.data);
  }

  useEffect(() => {
    getGroups(props.subjectId);
  }, [props.subjectId]);

  return (
    <>
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