import React, { useState, useEffect } from "react";
import style from "./Home.module.scss";

import Container from "../../../components/Container";
import LinkButton from "../../../components/LinkButton";

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
    </Container>
  );
}