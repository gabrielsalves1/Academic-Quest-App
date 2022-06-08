import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { BsFillTrashFill, BsPencilFill, BsFillEyeFill } from "react-icons/bs";
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
              <th>Visualizar Grupo</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            { groups?.map((group) => (
                <tr className={style.line} key={group.id}>
                  <td>{group.nome}</td>
                  <td>
                    <Link to={`/view-group/${group.id}/subject/${props.subjectId}`}>
                      <BsFillEyeFill className={style.icon}/>
                    </Link>
                  </td>
                  <td><BsPencilFill className={style.icon}/></td>
                  <td><BsFillTrashFill className={style.icon}/></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      }
    </>
  );
}