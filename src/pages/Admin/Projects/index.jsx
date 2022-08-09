import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import style from "./Projects.module.scss";

import { getClasses, getData } from "../../../service/requests";
import LinkButton from "../../../components/LinkButton";
import ListSubject from "../../../components/ListSubject";
import Container from "../../../components/Container";

export default function Projects() {
  const [ loading, setLoading ] = useState();
  const [ subjects, setSubjects ] = useState();

  return (
    <Container classStyle="containerAlignCenter">
      <h1 className={style.title}>Projetos</h1>

      <div className={style.projects}>
        <div className={style.menuClassAndProject}>
        <LinkButton to="/">Página inicial</LinkButton>
        <AsyncSelect 
          cacheOptions
          loadOptions={getClasses}
          onChange={(data) => {
            getData(`/materias/turma/${data.id}`, setSubjects, setLoading);
          }}
          defaultOptions
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary: '#aea8ee',
              neutral20: '#c3cfd9',
            },
          })}
          className={style.selectForm}
          placeholder="Selecione a turma"/>

          <LinkButton to="/create-project" classStyle="purple">Criar projeto</LinkButton>
        </div>

        { loading &&
          <ListSubject 
            subjects={subjects}
            getProjects={true}/>
        }
      </div>
    </Container>
  );
}