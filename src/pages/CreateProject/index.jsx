import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import style from "./CreateProject.module.scss";

import { getClasses, getData, postProject } from "../../service/requests";
import Container from "../../components/Container";
import LinkButton from "../../components/LinkButton";
import StylizedButton from "../../components/StylizedButton";
import ListSubject from "../../components/ListSubject";

export default function CreateProject() {
  const [ loading, setLoading ] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ subjects, setSubjects ] = useState();
  const [ selectSubject, setSelectSubject ] = useState();

  const onSubmit = data => {
    data['materiaId'] = selectSubject;

    postProject(data);
  }

  return (
    <Container classStyle="containerJustifyCenter">
      <h2 className={style.title}>Criar Projeto</h2>

      <Form onSubmit = { handleSubmit(onSubmit) } className={style.form}>
        <AsyncSelect 
        cacheOptions
        defaultOptions
        loadOptions={getClasses}
        onChange={(data) => {
          getData(`/materias/turma/${data.id}`, setSubjects, setLoading);
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary: '#aea8ee',
            neutral20: '#c3cfd9',
          },
        })}
        className={style.selectForm}
        placeholder="Selecione a turma"/>

        { loading &&
          <Form.Group>
            <Form.Label className={style.label} htmlFor="subject">Matéria</Form.Label>
            <ListSubject 
              subjects={subjects}
              setSelectSubject={setSelectSubject}/>
          </Form.Group> 
        }

        { selectSubject &&
          <>
            <Form.Group>
              <Form.Label htmlFor='name'>Nome</Form.Label>
              <Form.Control name="name" {...register("nome", { required: true })} className={style.inputForm}/>
              {errors.name && <span className={style.error}>Esse campo é obrigatório.</span>}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor='description'>Descrição</Form.Label>
              <Form.Control as="textarea" name="description" {...register("descricao", { required: true })} className={style.inputForm}/>
              {errors.description && <span className={style.error}>Esse campo é obrigatório.</span>}
            </Form.Group>
          </>
        }

        <div className={style.menuForm}>
          <LinkButton to="/projects">Voltar</LinkButton>

          <StylizedButton type="submit">Criar</StylizedButton>
        </div>
      </Form>
    </Container>
  );
}