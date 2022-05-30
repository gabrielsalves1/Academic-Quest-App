import React, { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import style from "./Groups.module.scss";

import api from "../../service/api";
import LinkButton from "../../components/LinkButton";
import ListGroups from "../../components/ListGroups";

export default function Groups() {
  const [ subjects, setSubjects ] = useState();

  async function getClasses() {
    const response = await api.get('/turmas');
    const options = response.data.map(classSchool => {
      return {
        label: classSchool.semestre+classSchool.complemento,
        id: classSchool.id
      }
    });
    return options;
  }

  async function getSubjects(id) {
    const response = await api.get(`/materias/turma/${id}`);
    setSubjects(response.data);
  }

  useEffect(() => {
    getClasses();
  }, [])

  return (
    <div className={style.containerGroups}>
      <h1 className={style.title}>Grupos</h1>

      <div className={style.groups}>
        <div className={style.menuClassAndGroup}>
          <AsyncSelect 
          cacheOptions
          loadOptions={getClasses}
          onChange={(data) => {
            getSubjects(data.id);
          }}
          defaultOptions
          className={style.selectForm}
          placeholder="Selecione a turma"/>
          
          <LinkButton to="/create-group" classStyle="purple">Criar grupo</LinkButton>
        </div>

        <ListGroups subjects={subjects}/>
      </div>
    </div>
  );
}