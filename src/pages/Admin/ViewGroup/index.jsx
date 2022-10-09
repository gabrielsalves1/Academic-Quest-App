import React, { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import style from "./ViewGroup.module.scss";

import { getData } from "../../../service/requests";
import Container from "../../../components/Container";
import LinkButton from "../../../components/LinkButton";
import NewContainer from "../../../components/NewContainer";
import BoxFlexDirectionColumn from "../../../components/BoxFlexDirectionColumn";

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
    <NewContainer>
      { loading ? (
        <BoxFlexDirectionColumn>
          <h1 className={style.title}>Grupo - {group?.nome}</h1>
          <h1 className={style.title}>{subject?.nome}</h1>
          <h2>Prof. {subject?.professor.firstName} {subject?.professor.lastName}</h2>
        
          <div className={style.integrants}>
            <h2 className={style.title}>Integrantes</h2>
            { group?.listaAlunos.map((student) => {
              if(student.id === group?.alunoLiderId) {
                return (
                  <span key={student.id}>
                    <FaCrown className={style.iconLead}/>{student.firstName} {student.lastName}
                  </span>
                );
              } else {
                return (
                  <span key={student.id}>
                    <BsFillPersonFill className={style.icon}/>{student.firstName} {student.lastName}
                  </span>
                );
              }})
            }
          </div>
        </BoxFlexDirectionColumn>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
      

      <div className={style.menuForm}>
        <LinkButton to="/groups">Voltar</LinkButton>

        <LinkButton to={`/edit-group/${idGroup}/subject/${idSubject}`} classStyle="purple">Editar</LinkButton>
      </div>
    </NewContainer>
  );
}