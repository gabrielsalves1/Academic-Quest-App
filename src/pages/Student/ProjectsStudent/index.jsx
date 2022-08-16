import React from "react";
import style from "./ProjectsStudent.module.scss";

import LinkButton from "../../../components/LinkButton";
import Container from "../../../components/Container";
import ListProjectsByStudent from "../../../components/ListProjectsByStudent";

export default function Projects() {
  return (
    <Container classStyle="containerAlignCenter">
      <h1 className={style.title}>Projetos</h1>

      <div className={style.projects}>
        <div className={style.menuProject}>
          <LinkButton to="/">Página inicial</LinkButton>
        </div>

        <ListProjectsByStudent/>
      </div>
    </Container>
  );
}