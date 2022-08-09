import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import style from "./EditProject.module.scss";

import { getData, putData } from "../../../service/requests";
import Container from "../../../components/Container";
import LinkButton from "../../../components/LinkButton";
import StylizedButton from "../../../components/StylizedButton";

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
    <Container classStyle="containerJustifyCenter">
      <h2 className={style.title}>Editar Projeto</h2>

      { loading ? (
        <Form onSubmit = { handleSubmit(onSubmit) } className={style.form}>
          <h2 className={style.titleSecondary}>{project?.materia}</h2>
          <h2 className={style.titleSecondary}>{project?.status}</h2>
        
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

          <div className={style.menuForm}>
            <LinkButton to={`/view-project/${project?.id}`}>Voltar</LinkButton>

            <StylizedButton type="submit">Criar</StylizedButton>
          </div>
        </Form>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
    </Container>
  );
}