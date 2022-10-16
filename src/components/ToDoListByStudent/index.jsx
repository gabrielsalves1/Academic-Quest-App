import React, { useState, useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import style from "./ToDoListByStudent.module.scss";

import { getData } from "../../service/requests";
import NewContainer from "../NewContainer";
import BoxFlexDirectionColumn from "../BoxFlexDirectionColumn";
import StylizedLink from "../StylizedLink";

export default function ToDoListByStudent() {
  const [ loading, setLoading ] = useState();
  const [ toDo, setToDo ] = useState();
  const [ userId, setUserId ] = useState(sessionStorage.getItem('idUser'));
  
  useEffect(() => {
    getData(`/aluno/tarefasPendentes/${userId}`, setToDo, setLoading);
  }, [userId]);

  return (
    <NewContainer>
      {loading ? (
        <BoxFlexDirectionColumn>
          <div className={style.toDoList} id="toDoList">
            <h3 className={style.titleSecondary}>Tarefas Pendentes do Aluno</h3>
            { toDo.length !== 0 ? (
              <Table className={style.table} data-testid="tableGroups">
                <thead className={style.header}>
                  <tr>
                    <th>Grupo</th>
                    <th>Matéria</th>
                    <th>Projeto</th>
                    <th>Atividade</th>
                    <th>Data de Entrega</th>
                    <th>Visualizar Tarefa</th>
                  </tr>
                </thead>
                <tbody>
                  { toDo?.map((toDo) => (
                      <tr className={style.line} key={toDo.idTarefaGrupo}>
                        <td>{toDo.nomeGrupo}</td>
                        <td>{toDo.nomeMateria}</td>
                        <td>{toDo.nomeProjeto}</td>
                        <td>{toDo.nomeAtividade}</td>
                        <td>{new Date(Date.parse(toDo.dataEntregaAtividade)).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                        <td>
                        <StylizedLink to={`/view-task/${toDo.idTarefaGrupo}`}>
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