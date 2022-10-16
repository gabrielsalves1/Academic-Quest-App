import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import style from "./ViewProject.module.scss";

import { getData, postData } from "../../../service/requests";
import NewContainer from "../../../components/NewContainer";
import StylizedButton from "../../../components/StylizedButton";
import LinkButton from "../../../components/LinkButton";
import ComeBackButtonIcon from "../../../components/ComeBackButtonIcon";
import StatusBarGreen from "../../../components/StatusBarGreen";
import StatusBarGray from "../../../components/StatusBarGray";
import BoxResult from "../../../components/BoxResult";
import BoxFlexDirectionColumn from "../../../components/BoxFlexDirectionColumn";

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
      <BoxResult>
        <BoxFlexDirectionColumn>
        
        { loading ? (
      
        <>
         {project?.status === "EM_ANDAMENTO" &&
           <StatusBarGreen classStyle="slim">Ativo</StatusBarGreen>  
          }
          
          {project?.status === "CONCLUIDO" &&
            <StatusBarGray classStyle="slim">Concluído</StatusBarGray>
          }
        
        
          <h1 className={style.title}> {project?.nome}</h1>
          <h2 className={style.subtitle}>Matéria:  <span className={style.textBody}>{project?.materia}</span></h2>
          <h2 className={style.subtitle}>Descrição:  <span className={style.textBody}>{project?.descricao}</span></h2>
       

        <div className={style.questStatus}>
          <LinkButton to={`/edit-project/${project?.id}`} classStyle="purple">Editar</LinkButton>
          <StylizedButton type="submit"  onClick={() => {onSubmit("")}}>Atribuir Nota</StylizedButton>
        </div>
        </>

    ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
      
        </BoxFlexDirectionColumn>
      </BoxResult>
   
      

    </NewContainer>
  );
}