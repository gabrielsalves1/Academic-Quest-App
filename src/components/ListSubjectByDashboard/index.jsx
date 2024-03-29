import React, { useState } from "react";
import style from "./ListSubjecByDashboard.module.scss";

import ListProjectsByDashboard from "../ListProjectsByDashboard";
import ListGroups from "../ListGroups";

export default function ListSubject(props) {
  const [ subjectId, setSubjectId ] = useState();

  return (
    <>
      <ul className={style.listSubject} data-testid="listSubject">
        { props.subjects?.map((subject) => (
          <li key={subject.id} className={style.subject}>
            <div className={`${subject.id === subjectId ? style.subjectItemActive : style.subjectItem}`} onClick={() => { 
                setSubjectId(subject.id);
                
                if(props.setSelectSubject) {
                  props.setSelectSubject(subject.id);
                }
              }
            }>{subject.nome}</div>
          </li>
          ))
        }
      </ul>

      { props.subjects?.length === 0 && <span className={style.withoutDataError}>Não há nenhuma matéria cadastrada para a turma.</span> }
      { props.getProjects && props.subjects?.length !== 0 && subjectId && <ListProjectsByDashboard subjectId={subjectId}/> }
      { props.getGroups && props.subjects?.length !== 0 && subjectId && <ListGroups subjectId={subjectId}/> }
    </>
  );
}