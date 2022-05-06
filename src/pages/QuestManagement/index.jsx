import React from "react";
import style from "./QuestManagement.module.scss";

import ListQuests from "../../components/ListQuests";

export default function QuestManagement(props) {
  return (
    <div className={style.containerQuest}>
      <h1 className={style.title}>
        Projeto: {props.name}
      </h1>

      <ListQuests></ListQuests>
    </div>
  );
}