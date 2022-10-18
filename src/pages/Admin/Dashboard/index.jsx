import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import style from "./Dashboard.module.scss";

import { getClasses, getData } from "../../../service/requests";
import LinkButton from "../../../components/LinkButton";
import ListSubjectByDashboard from "../../../components/ListSubjectByDashboard";
import NewContainer from "../../../components/NewContainer";
import BoxFlexDirectionColumn from "../../../components/BoxFlexDirectionColumn";

export default function Projects() {
  const [ loading, setLoading ] = useState();
  const [ subjects, setSubjects ] = useState();
  const [ userId, setUserId ] = useState(sessionStorage.getItem("idUser"));

  return (
    <NewContainer>
      <h1 className={style.title}>Dashboard</h1>

      <BoxFlexDirectionColumn>
        <div className={style.projects}>
          <div className={style.menuClassAndProject}>
          <LinkButton to="/">Página inicial</LinkButton>
          <AsyncSelect 
            cacheOptions
            loadOptions={getClasses}
            onChange={(data) => {
              getData(`/materias/turma/${data.id}/idProfessor/${userId}`, setSubjects, setLoading);
            }}
            defaultOptions
            theme={(theme) => ({
              ...theme,
              borderRadius: 16,
              colors: {
                ...theme.colors,
                primary: '#845EC2',
                neutral20: '#D1D5DB',
              },
            })}
            className={style.selectForm}
            placeholder="Selecione a turma"/>
          </div>
          
          { loading &&
            <ListSubjectByDashboard
              subjects={subjects}
              getProjects={true}/>
          }
        </div>
      </BoxFlexDirectionColumn>
    </NewContainer>
  );
}