import React, { useState } from "react";
import style from "./ListSubject.module.scss";

import ListGroups from "../ListGroups";

export default function ListSubject(props) {
  const [ subjectId, setSubjectId ] = useState();

  return (
    <>
      <ul className={style.listSubject} data-testid="listSubject">
        {
          props.subjects?.map((subject) => (
            <li key={subject.id}>
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

      { props.getGroups && subjectId && <ListGroups subjectId={subjectId}/> }
    </>
  );
}