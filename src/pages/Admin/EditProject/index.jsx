import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import style from "./EditProject.module.scss";

import { getData, putData } from "../../../service/requests";
import NewContainer from "../../../components/NewContainer";
import StylizedButton from "../../../components/StylizedButton";
import ComeBackButtonIcon from "../../../components/ComeBackButtonIcon";
import BoxResult from "../../../components/BoxResult";
import BoxFlexDirectionColumn from "../../../components/BoxFlexDirectionColumn";
import StatusBarGreen from "../../../components/StatusBarGreen";
import StatusBarGray from "../../../components/StatusBarGray";

export default function EditProject() {
  const [ loading, setLoading ] = useState();
  const { idProject } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ project, setProject] = useState();

  useEffect(() => {
    getData(`/projetos/${idProject}`, setProject, setLoading);
  }, [idProject])

  const onSubmit = data => {
    putData(data, `/projetos/${idProject}`, `/view-project/${idProject}`)
  }

  return (
    <NewContainer >
      <ComeBackButtonIcon url={`/view-project/${project?.id}`}> </ComeBackButtonIcon>
      <BoxResult> 

        <BoxFlexDirectionColumn>
        {project?.status === "EM_ANDAMENTO" &&
          <StatusBarGreen classStyle="slim">Ativo</StatusBarGreen>  
        }
        
        {project?.status === "CONCLUIDO" &&
          <StatusBarGray classStyle="slim">Concluído</StatusBarGray>
        }

          <h2 className={style.title}>Editar Projeto</h2>

          { loading ? (
            <Form onSubmit = { handleSubmit(onSubmit) } className={style.form}>
              <h2 className={style.titleSecondary}>{project?.materia}</h2>
           
              <Form.Group>
                <Form.Label htmlFor='name'>Nome</Form.Label>
                <Form.Control defaultValue={`${project?.nome}`} name="name" {...register("nome", { required: true })} className={style.inputForm}/>
                {errors.name && <span className={style.error}>Esse campo é obrigatório.</span>}
              </Form.Group>
          
              <Form.Group>
                <Form.Label htmlFor='description'>Descrição</Form.Label>
                <Form.Control defaultValue={project?.descricao}  as="textarea" name="description" {...register("descricao", { required: true })} className={style.inputForm}/>
                {errors.description && <span className={style.error}>Esse campo é obrigatório.</span>}
              </Form.Group>

              <StylizedButton type="submit">Salvar</StylizedButton>
            </Form>
          ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
        </BoxFlexDirectionColumn>
      </BoxResult>
    </NewContainer>
  );
}