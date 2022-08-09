import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";
import { RiEye2Line } from "react-icons/ri";
import style from "./ToDoListByStudent.module.scss";

import { getData } from "../../service/requests";

export default function ToDoListByStudent() {
  const [loading, setLoading] = useState();
  const [toDo, setToDo] = useState();
  
  useEffect(() => {
    getData("/aluno/tarefasPendentes/3", setToDo, setLoading);
  }, [3]);

  return (
    <>
      {loading ? (
        <div className={style.toDoList} id="toDoList">
          <h3 className={style.titleSecondary}>Tarefas Pendentes do Aluno</h3>
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
                  <td>{new Date(Date.parse(toDo.dataEntregaAtividade)).toLocaleDateString()}</td>
                  <td>
                  <Link to={`/tarefaGrupo/${toDo.idTarefaGrupo}`}>
                      <RiEye2Line className={style.icon}/>
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
          </Table>
        </div>
      ) :  (<Spinner className={style.loading} animation="border" variant="primary" />)}
    </>
  );
}