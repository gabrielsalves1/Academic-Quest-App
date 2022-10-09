import React, { useState } from "react";
import AsyncSelect from 'react-select/async';
import style from "./Groups.module.scss";

import { getClasses, getData } from "../../../service/requests";
import Container from "../../../components/Container";
import LinkButton from "../../../components/LinkButton";
import ListSubject from "../../../components/ListSubject";
import NewContainer from "../../../components/NewContainer";
import BoxFlexDirectionColumn from "../../../components/BoxFlexDirectionColumn";

export default function Groups() {
  const [ loading, setLoading ] = useState();
  const [ subjects, setSubjects ] = useState();

  return (
    <NewContainer>
      <h1 className={style.title}>Grupos</h1>

      <BoxFlexDirectionColumn>
        <div className={style.groups}>
          <div className={style.menuClassAndGroup}>
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
            
            <LinkButton to="/create-group" classStyle="purple">Criar grupo</LinkButton>
          </div>
          
          { loading &&
            <ListSubject 
            subjects={subjects}
            getGroups={true}/>
          }
        </div>
      </BoxFlexDirectionColumn>
    </NewContainer>
  );
}