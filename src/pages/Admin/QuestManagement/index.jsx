import React from "react";
import { useParams } from "react-router-dom";
import style from "./QuestManagement.module.scss";

import ListQuests from "../../../components/ListQuests";
import NewContainer from "../../../components/NewContainer";
import ComeBackButtonIcon from "../../../components/ComeBackButtonIcon";

export default function QuestManagement(props) {
  const { idProject } = useParams();

  return (
    <NewContainer>
       <ComeBackButtonIcon url={`/projects`}> </ComeBackButtonIcon>
        <h1 className={style.title}>
          Gerenciamento de Quest
        </h1>
      <ListQuests idProject={idProject}></ListQuests>
    </NewContainer>
  );
}