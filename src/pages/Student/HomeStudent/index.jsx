import React from "react";
import { Image } from "react-bootstrap";
import style from "./HomeStudent.module.scss";

import logo from '../../../assets/img/logo-academic-quest.png';
import Container from "../../../components/Container";
import About from "../../../components/About";
import ToDoListByStudent from "../../../components/ToDoListByStudent";
import LinkButton from "../../../components/LinkButton";
import StylizedA from "../../../components/StylizedA";

export default function HomeStudent() {
  return (
    <Container classStyle="containerAlignCenter">
      <h2 className={style.title}>Aluno, bem-vindo ao Academic Quest!</h2>

      <div className={style.links}>
        <LinkButton to="/projects">
          <Image fluid src={logo} className={style.logo}/>
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