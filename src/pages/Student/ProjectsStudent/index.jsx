import React from "react";
import style from "./ProjectsStudent.module.scss";

import LinkButton from "../../../components/LinkButton";
import NewContainer from "../../../components/NewContainer";
import ListProjectsByStudent from "../../../components/ListProjectsByStudent";

export default function Projects() {
  return (
    <NewContainer>
      <h1 className={style.title}>Projetos</h1>

      <div className={style.projects}>
        <ListProjectsByStudent/>
      </div>
    </NewContainer>
  );
}