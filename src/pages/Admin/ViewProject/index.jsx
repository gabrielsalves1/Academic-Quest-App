import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import style from "./ViewProject.module.scss";

import { getData, postData, postGroupGradeByProject } from "../../../service/requests";
import Container from "../../../components/Container";
import StylizedButton from "../../../components/StylizedButton";
import LinkButton from "../../../components/LinkButton";
import { FiArrowLeft } from "react-icons/fi";

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
    <Container className={style.containerViewProject}>
      <div className={style.menuForm}>
        <a href="/projects">
          <FiArrowLeft className={style.iconComeBack} />
        </a>
      </div>
   
      { loading ? (
        
        <section className={style.questSection}>
          
          <div className={style.questInfo}>
            <h1 className={style.title}> {project?.nome}</h1>
            <h2 className={style.subtitle}>Matéria:  <span className={style.textBody}>{project?.materia}</span></h2>
            <h2 className={style.subtitle}>Descrição:  <span className={style.textBody}>{project?.descricao}</span></h2>
          </div>

          <div className={style.questStatus}>
            {project?.status === "EM_ANDAMENTO" &&
              <h3 className={style.status}>Em andamento</h3>
            }
            
            {project?.status === "CONCLUIDO" &&
              <h3 className={style.status}>Concluído</h3>
            }
            
            <StylizedButton type="submit"  onClick={() => {onSubmit("")}}>Atribuir Nota</StylizedButton>
            <LinkButton to={`/edit-project/${project?.id}`} classStyle="purple">Editar</LinkButton>
          </div>
        </section>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }

      
    </Container>
  );
}