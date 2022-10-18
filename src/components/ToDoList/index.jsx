import React, { useState, useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import style from "./ToDoList.module.scss";

import { getData } from "../../service/requests";
import StylizedLink from "../StylizedLink";
import NewContainer from "../NewContainer";
import BoxFlexDirectionColumn from "../BoxFlexDirectionColumn";

export default function ToDoList() {
  const [loading, setLoading] = useState();
  const [toDo, setToDo] = useState();
  const [ userId, setUserId ] = useState(sessionStorage.getItem("idUser"));
  
  useEffect(() => {
    getData(`/tarefa/grupo/entregues/professorId/${userId}`, setToDo, setLoading);
  }, []);

  return (
    <NewContainer>
      { loading ? (
        <BoxFlexDirectionColumn>
          <div className={style.toDoList} id="toDoList">
            <h3 className={style.titleSecondary}>Tarefas Entregues pelos Alunos</h3>
            { toDo.length !== 0 ? (
              <Table className={style.table} data-testid="tableGroups">
              <thead className={style.header}>
                <tr>
                  <th>Atividade</th>
                  <th>Grupo</th>
                  <th>Status</th>
                  <th>Data de Entrega</th>
                  <th>Visualizar Tarefa</th>
                </tr>
              </thead>
              <tbody>
                { toDo?.map((toDo) => (
                    <tr className={style.line} key={toDo.id}>
                      <td>{toDo.nomeTarefa}</td>
                      <td>{toDo.nomeGrupo}</td>
                      <td>{toDo.statusTarefaGrupo}</td>
                      <td>{new Date(Date.parse(toDo.dataEntrega)).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                      <td>
                      <StylizedLink to={`/project/${toDo.idProjeto}/view-task/${toDo.idTarefa}/task-group/${toDo.id}`}>
                          Visualizar
                      </StylizedLink>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            ) : ( <span className={style.text}>Não há tarefas entregues pelos alunos pendentes de correção.</span>) }
          </div>
        </BoxFlexDirectionColumn>
      ) :  (<Spinner className={style.loading} animation="border" variant="primary" />)}
    </NewContainer>
  );
}