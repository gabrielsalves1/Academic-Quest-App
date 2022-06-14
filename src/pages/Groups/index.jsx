import React, { useState } from "react";
import AsyncSelect from 'react-select/async';
import style from "./Groups.module.scss";

import { getClasses, getSubjects } from "../../service/requests";
import Container from "../../components/Container";
import LinkButton from "../../components/LinkButton";
import ListSubject from "../../components/ListSubject";

export default function Groups() {
  const [ subjects, setSubjects ] = useState();

  return (
    <Container>
      <h1 className={style.title}>Grupos</h1>

      <div className={style.groups}>
        <div className={style.menuClassAndGroup}>
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
          
          <LinkButton to="/create-group" classStyle="purple">Criar grupo</LinkButton>
        </div>

        <ListSubject 
        subjects={subjects}
        getGroups={true}/>
      </div>
    </Container>
  );
}