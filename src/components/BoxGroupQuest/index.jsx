import React from "react";
import style from "./BoxGroupQuest.module.scss";
import { Link } from "react-router-dom";
import StatusBarGreen from "../StatusBarGreen";
import StatusBarYellow from "../StatusBarYellow";
import StatusBarRed from "../StatusBarRed";

export default function BoxGroupQuest(props) {

  const date = props.children.dataEntrega ? new Date(Date.parse(props.children.dataEntrega)).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "Não entregue";
  const nota = props.children.nota !== null ? props.children.nota : "-";
  return (
    <Link to={props.url}>   
      <div className={style.box}>
        <span className={style.nomeGrupo}> {props.children.nomeGrupo}</span>

        <div className={style.entregue}>
          Entregue:  {date}
        </div>

        <span className={style.nota}> {nota}</span>
        
        {props.children.statusTarefaGrupo === "CORRIGIDA" &&
          <StatusBarGreen classStyle="slim">Corrigida</StatusBarGreen>  
        }
        {props.children.statusTarefaGrupo === "ENTREGUE" &&
          <StatusBarYellow classStyle="slim">Entregue</StatusBarYellow>  
        }
        {props.children.statusTarefaGrupo === "PENDENTE" &&
          <StatusBarRed classStyle="slim">Não entregue</StatusBarRed>  
        }
        
      </div>
    </Link>
  );
}