import React, { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import style from "./ViewGroup.module.scss";

import { getData } from "../../service/requests";
import Container from "../../components/Container";
import LinkButton from "../../components/LinkButton";

export default function ViewGroup() {
  const [ loading, setLoading ] = useState();
  const { idGroup, idSubject } = useParams();
  const [ group, setGroup ] = useState();
  const [ subject, setSubject ] = useState();

  useEffect(() => {
    getData(`/materias/${idSubject}`, setSubject, setLoading);
    getData(`/grupos/${idGroup}`, setGroup, setLoading);
  }, [idGroup, idSubject])

  return (
    <Container classStyle="containerJustifyCenter">
      { loading ? (
        <>
          <h1 className={style.title}>Grupo - {group?.nome}</h1>
          <h1 className={style.title}>{subject?.nome}</h1>
          <h2>Prof. {subject?.professor.firstName} {subject?.professor.lastName}</h2>
        
          <div className={style.integrants}>
            <h2 className={style.title}>Integrantes</h2>
            { group?.listaAlunos.map((student) => (
                <span key={student.id}><BsFillPersonFill className={style.icon}/>{student.firstName} {student.lastName}</span>
              ))
            }
          </div>
        </>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
      

      <div className={style.menuForm}>
        <LinkButton to="/groups">Voltar</LinkButton>

        <LinkButton to={`/edit-group/${idGroup}`} classStyle="purple">Editar</LinkButton>
      </div>
    </Container>
  );
}