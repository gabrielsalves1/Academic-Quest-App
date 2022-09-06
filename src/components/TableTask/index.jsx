import React, { useState, useEffect } from "react";
import { Table, Spinner } from "react-bootstrap";
import style from "./TableTask.module.scss";

import { getData } from "../../service/requests";
import StylizedLink from "../StylizedLink";

export default function TableTask(props) {
  const [ loading, setLoading ] = useState();
  const [ taskGroups, setTaskGroups ] = useState();

  useEffect(() => {
    getData(`/tarefa/grupo/${props.idQuest}`, setTaskGroups, setLoading);
  }, [props.idQuest]);

  return (
    <div className={style.listTaskGroup}>
      <h2 className={style.titleSecundary}>Grupos</h2>

      { loading ? (
        <Table data-testid="tableTask" className={style.table}>
          <thead className={style.header}>
            <tr>
              <th>Grupo</th>
              <th>Status</th>
              <th>Nota</th>
              <th>Data de Entrega</th>
              <th>Visualizar</th>
            </tr>
          </thead>
          <tbody>
          { taskGroups?.map((group) => (
            <tr className={style.line} key={group.id}>
              <td>{group.nomeGrupo}</td>
              <td>{group.statusTarefaGrupo}</td>
              <td>{group.nota !== null ? group.nota : " - "}</td>
              <td>{group.dataEntrega ? new Date(Date.parse(group.dataEntrega)).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : " - "}</td>
              <td>
                <StylizedLink to={`/project/${props.idProject}/view-task/${props.idQuest}/task-group/${group.id}`}>
                  Visualizar
                </StylizedLink>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
    ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
    </div>
  );
}