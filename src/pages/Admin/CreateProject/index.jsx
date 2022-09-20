import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import style from "./CreateProject.module.scss";

import { getClasses, getData, postData } from "../../../service/requests";
import Container from "../../../components/Container";
import ComeBackButtonIcon from "../../../components/ComeBackButtonIcon";
import StylizedButton from "../../../components/StylizedButton";
import ListSubject from "../../../components/ListSubject";
import { FiArrowLeft } from "react-icons/fi";

export default function CreateProject() {
  const [ loading, setLoading ] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ subjects, setSubjects ] = useState();
  const [ selectSubject, setSelectSubject ] = useState();

  const onSubmit = data => {
    data['materiaId'] = selectSubject;

    postData('/projetos', data, '/projects');
  }

  return (
    <Container classStyle="containerJustifyCenter">
     <ComeBackButtonIcon url="/projects"> </ComeBackButtonIcon>
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
          borderRadius: 10,
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
            <Form.Label className={style.label} htmlFor="subject">Matérias</Form.Label>
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
            <StylizedButton type="submit">Criar</StylizedButton>
          </>
        }
      </Form>
    </Container>
  );
}