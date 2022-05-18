import React, { useState, useEffect } from "react";
import AsyncSelect from 'react-select/async';
import style from "./Groups.module.scss";

import api from "../../service/api";
import LinkButton from "../../components/LinkButton";

export default function Groups() {
  async function getClasses() {
    const response = await api.get('/turmas');
    const options = response.data.map(classSchool => {
      return {
        label: classSchool.semestre+classSchool.complemento,
        value: classSchool.id
      }
    });
    return options;
  }

  async function getSubject(idClass) {
    const response = await api.get(`/materias/turma/${idClass}`);
    console.log(response.data)
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
            getSubject(data.value);
          }}
          defaultOptions
          className={style.selectForm}/>
          
          <LinkButton to="/create-group" classStyle="purple">Criar grupo</LinkButton>
        </div>

      </div>
    </div>
  );
}