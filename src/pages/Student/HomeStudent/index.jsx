import React from "react";
import style from "./HomeStudent.module.scss";

import Container from "../../../components/Container";
import About from "../../../components/About";
import ToDoListByStudent from "../../../components/ToDoListByStudent";
import LinkButton from "../../../components/LinkButton";
import StylizedA from "../../../components/StylizedA";
import { useEffect } from "react";
import { useState } from "react";

export default function HomeStudent() {
  const [ username, setUsername ] = useState();

  useEffect(() => {
    setUsername(sessionStorage.getItem('userFirstName'));
  }, [])

  return (
    <Container classStyle="containerAlignCenter">
      <h2 className={style.title}>{username}, bem-vindo ao Academic Quest!</h2>

      <div className={style.links}>
        <LinkButton to="/projects">
          Projetos
        </LinkButton>
      </div>

      <div className={style.usefulLinks}>
        <h3 className={style.titleSecondary}>Links úteis</h3>

        <StylizedA href="#toDoList">Tarefas Pendentes</StylizedA>
        <StylizedA href="#about">Sobre o Academic Quest</StylizedA>
      </div>
      
      <ToDoListByStudent/>
      <About/>
    </Container>
  );
}