import React, { useState, useEffect } from "react";
import style from "./Home.module.scss";

import Container from "../../../components/Container";
import About from "../../../components/About";
import LinkButton from "../../../components/LinkButton";
import StylizedA from "../../../components/StylizedA";
import ToDoList from "../../../components/ToDoList";

export default function Home() {
  const [ username, setUsername ] = useState();

  useEffect(() => {
    setUsername(sessionStorage.getItem('userFirstName'));
  }, [])

  return (
    <Container classStyle="containerAlignCenter">
      <h2 className={style.title}>Professor {username}, bem-vindo ao Academic Quest!</h2>

      <div className={style.links}>
        <LinkButton to="/projects">
          Projetos
        </LinkButton>
        <LinkButton to="/groups">
          Grupos
        </LinkButton>
        <LinkButton to="/dashboard">
          Relatórios
        </LinkButton>
      </div>

      <div className={style.usefulLinks}>
        <h3 className={style.titleSecondary}>Links úteis</h3>

        <StylizedA href="#toDoList">Tarefas Entregues pelos Alunos</StylizedA>
        <StylizedA href="#about">Sobre o Academic Quest</StylizedA>
      </div>
      
      <ToDoList/>
      <About/>
    </Container>
  );
}