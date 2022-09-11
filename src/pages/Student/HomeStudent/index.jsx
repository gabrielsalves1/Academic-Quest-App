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
      <div className={style.links}>
        <LinkButton to="/projects">
          Projetos
        </LinkButton>
      </div>
    </Container>
  );
}