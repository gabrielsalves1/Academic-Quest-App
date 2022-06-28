import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { BsFillEyeFill } from "react-icons/bs";
import style from "./TableTask.module.scss";

import { getTaskGroups } from "../../service/requests";

export default function TableTask(props) {
  const [ taskGroups, setTaskGroups ] = useState();

  useEffect(() => {
    getTaskGroups(props.idQuest, setTaskGroups);
  }, [props.idQuest]);

  return (
    <>
      <h2 className={style.titleSecundary}>Grupos</h2>

      <Table data-testid="tableTask" className={style.table}>
        <thead className={style.header}>
          <tr>
            <th>Grupo</th>
            <th>Status</th>
            <th>Nota</th>
            <th>Data de Entrega</th>
            <th>Abrir</th>
          </tr>
        </thead>
        <tbody>
        { taskGroups?.map((group) => (
          <tr className={style.line}>
            <td>{group.nomeGrupo}</td>
            <td>{group.statusTarefaGrupo}</td>
            <td>{group.nota !== null ? group.nota : " - "}</td>
            <td>{group.dataEntrega ? new Date(Date.parse(group.dataEntrega)).toLocaleDateString() : " - "}</td>
            <td>
              <Link to={`/project/${props.idProject}/view-task/${props.idQuest}/group/${group.id}`}>
                <BsFillEyeFill className={style.icon}/>
              </Link>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </>
  );
}