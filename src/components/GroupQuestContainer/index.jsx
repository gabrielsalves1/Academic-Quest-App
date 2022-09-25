import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import style from "./GroupQuestContainer.module.scss";

import { getData } from "../../service/requests";
import StylizedLink from "../StylizedLink";
import BoxGroupQuest from "../BoxGroupQuest";

export default function GroupQuestContainer(props) {
  const [ loading, setLoading ] = useState();
  const [ taskGroups, setTaskGroups ] = useState();

  useEffect(() => {
    getData(`/tarefa/grupo/${props.idQuest}`, setTaskGroups, setLoading);
  }, [props.idQuest]);

  return (
    <div className={style.container}>
     { loading ? (
      taskGroups.map( (group) => (
        <BoxGroupQuest url={`/project/${props.idProject}/view-task/${props.idQuest}/task-group/${group.id}`}>
         {group} 
        </BoxGroupQuest>
        ))
     ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
    </div>
  );
      

}