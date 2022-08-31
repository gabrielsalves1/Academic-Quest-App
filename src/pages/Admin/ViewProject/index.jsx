import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import style from "./ViewProject.module.scss";

import { getData, postData, postGroupGradeByProject } from "../../../service/requests";
import Container from "../../../components/Container";
import StylizedButton from "../../../components/StylizedButton";
import LinkButton from "../../../components/LinkButton";

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
    <Container classStyle="containerJustifyCenter">
      { loading ? (
        <section className={style.questSection}>
          <div className={style.questInfo}>
            <h1 className={style.title}>Projeto: {project?.nome}</h1>
            <h2 className={style.title}>Matéria: {project?.materia}</h2>
            <h2 className={style.title}>Descrição: {project?.descricao}</h2>
          </div>

          <div className={style.questInfo}>
            {project?.status === "EM_ANDAMENTO" &&
              <h3 className={style.title}>Em andamento</h3>
            }
            
            {project?.status === "CONCLUIDO" &&
              <h3 className={style.title}>Concluído</h3>
            }
            
            <StylizedButton type="submit"  onClick={() => {onSubmit("")}}>Atribuir Nota</StylizedButton>
          </div>
        </section>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }

      <div className={style.menuForm}>
        <LinkButton to="/projects">Voltar</LinkButton>

        <LinkButton to={`/edit-project/${project?.id}`} classStyle="purple">Editar</LinkButton>
      </div>
    </Container>
  );
}