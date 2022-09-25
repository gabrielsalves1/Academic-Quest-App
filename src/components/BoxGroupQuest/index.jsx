import React from "react";
import style from "./BoxGroupQuest.module.scss";
import StatusBarGreen from "../StatusBarGreen";
import StatusBarYellow from "../StatusBarYellow";

export default function BoxGroupQuest(props) {

  const date = props.children.dataEntrega ? new Date(Date.parse(props.children.dataEntrega)).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "Não entregue";
  const nota = props.children.nota !== null ? props.children.nota : "-";
  return (
    <a href={props.url}>   
      <div className={style.box}>
        { console.log(props.children)}
        <span className={style.nomeGrupo}> {props.children.nomeGrupo}</span>
        <div className={style.entregue}>
          Entregue:  {date}
        </div>
        <span className={style.nota}> {nota}</span>
    
        {props.children.statusTarefaGrupo === "ENTREGUE" &&
          <StatusBarGreen classStyle="slim">Entregue</StatusBarGreen>  
        }
        {props.children.statusTarefaGrupo === "PENDENTE" &&
          <StatusBarYellow classStyle="slim">Não entregue</StatusBarYellow>  
        }
        
      </div>
    </a>
  );
}