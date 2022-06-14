import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import style from "./Projects.module.scss";

import { getClasses, getSubjects } from "../../service/requests";
import LinkButton from "../../components/LinkButton";
import ListSubject from "../../components/ListSubject";

export default function Projects() {
  const [ subjects, setSubjects ] = useState();

  return (
    <div className={style.containerProjects}>
      <h1 className={style.title}>Projetos</h1>

      <div className={style.projects}>
        <div className={style.menuClassAndProject}>
        <AsyncSelect 
          cacheOptions
          loadOptions={getClasses}
          onChange={(data) => {
            getSubjects(data.id, setSubjects);
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

        <ListSubject 
        subjects={subjects}
        getProjects={true}/>
      </div>
    </div>
  );
}