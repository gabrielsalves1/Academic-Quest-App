import React, { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import style from "./ViewGroup.module.scss";

import { getGroup } from "../../service/requests";
import Container from "../../components/Container";
import LinkButton from "../../components/LinkButton";

export default function ViewGroup() {
  const { idGroup, idSubject } = useParams();
  const [ group, setGroup ] = useState();

  useEffect(() => {
    getGroup(idGroup, setGroup);
  }, [idGroup])

  return (
    <Container classStyle="containerJustifyCenter">
      <h1 className={style.title}>Grupo {group?.nome} - {idGroup}</h1>
      <h1 className={style.title}>Matéria - {idSubject}</h1>

      <div className={style.integrants}>
        <h2 className={style.title}>Integrantes</h2>
        { group?.alunos.map((student) => (
            <span>{student.firstName} {student.lastName} <BsFillPersonFill/></span>
          ))
        }
      </div>

      <div className={style.menuForm}>
        <LinkButton to="/groups">Voltar</LinkButton>
      </div>
    </Container>
  );
}