import React from "react";
import { Image } from "react-bootstrap";
import style from "./Home.module.scss";

import logo from '../../../assets/img/logo-academic-quest.png';
import Container from "../../../components/Container";
import About from "../../../components/About";
import LinkButton from "../../../components/LinkButton";
import StylizedA from "../../../components/StylizedA";

export default function Home() {
  return (
    <Container classStyle="containerAlignCenter">
      <h2 className={style.title}>Bem-vindo ao Academic Quest!</h2>

      <div className={style.links}>
        <LinkButton to="/projects">
          <Image fluid src={logo} className={style.logo}/>
          Projetos
        </LinkButton>
        <LinkButton to="/groups">
          <Image fluid src={logo} className={style.logo}/>
          Grupos
        </LinkButton>
        <LinkButton to="/dashboard">
          <Image fluid src={logo} className={style.logo}/>
          Relatórios
        </LinkButton>
      </div>

      <div className={style.usefulLinks}>
        <h3 className={style.titleSecondary}>Links úteis</h3>

        <StylizedA href="#about">Sobre o Academic Quest</StylizedA>
      </div>
      
      <About/>
    </Container>
  );
}