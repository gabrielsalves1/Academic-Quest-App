import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import style from "./ViewProject.module.scss";

import { getData, postData, postGroupGradeByProject } from "../../../service/requests";
import NewContainer from "../../../components/NewContainer";
import StylizedButton from "../../../components/StylizedButton";
import LinkButton from "../../../components/LinkButton";
import ComeBackButtonIcon from "../../../components/ComeBackButtonIcon";
import StatusBarGreen from "../../../components/StatusBarGreen";
import StatusBarGray from "../../../components/StatusBarGray";

export default function ViewProject() {
  const [ loading, setLoading ] = useState();
  const { idProject } = useParams();
  const [ project, setProject ] = useState();

  useEffect(() => {
    getData(`/projetos/${idProject}`, setProject, setLoading);
  }, [idProject]);

  const onSubmit = data => {
    postData(`/projetos/avaliar/${idProject}`, data);
  }

  return (
    <NewContainer>
 
      <ComeBackButtonIcon url="/projects"> </ComeBackButtonIcon>
   
      { loading ? (
        
        <section className={style.questSection}>
           {project?.status === "EM_ANDAMENTO" &&
             <StatusBarGreen classStyle="slim">Ativo</StatusBarGreen>  
            }
            
            {project?.status === "CONCLUIDO" &&
              <StatusBarGray classStyle="slim">Concluído</StatusBarGray>
            }
          
          <div className={style.questInfo}>
            <h1 className={style.title}> {project?.nome}</h1>
            <h2 className={style.subtitle}>Matéria:  <span className={style.textBody}>{project?.materia}</span></h2>
            <h2 className={style.subtitle}>Descrição:  <span className={style.textBody}>{project?.descricao}</span></h2>
          </div>

          <div className={style.questStatus}>
            <LinkButton to={`/edit-project/${project?.id}`} classStyle="purple">Editar</LinkButton>
            <StylizedButton type="submit"  onClick={() => {onSubmit("")}}>Atribuir Nota</StylizedButton>
          </div>
        </section>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }

    </NewContainer>
  );
}