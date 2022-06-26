import React, { useState, useEffect } from "react";
import style from "./ListQuests.module.scss";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

import LinkButton from "../LinkButton";
import { getTasks } from "../../service/requests";

export default function ListQuests(props) {
  const [ quests, setQuests ] = useState();

  useEffect(() => {
    getTasks(props.idProject, setQuests);
  }, []);

  return (
    <>
      <div className={style.menuCreateQuest}>
        <LinkButton to="/projects">Voltar</LinkButton>

        <LinkButton to={`/project/${props.idProject}/create-quest`} classStyle="purple">Criar Quest</LinkButton>
      </div>

      <div className={style.titles}>
        <h2 className={style.title}>Quest</h2>
        <h2 className={style.title}>Data de Entrega</h2>
        <h2 className={style.titleStatus}>Status</h2>
        <h2 className={style.title}>Editar</h2>
        <h2 className={style.title}>Excluir</h2>
      </div>

      <ul>
        { quests?.map((quest) => (
            <li className={style.quest}>
              <LinkButton to={`/project/${props.idProject}/evaluate-quest/${quest.id}`}>{quest.nome}</LinkButton>
              <span>{quest.dataEntrega}</span>
              <span className={style.active}>Ativo</span>
              <BsPencilSquare className={style.icone}/>
              <BsTrash className={style.icone}/>
            </li>
          )
        )}
      </ul>
    </>
  );
}