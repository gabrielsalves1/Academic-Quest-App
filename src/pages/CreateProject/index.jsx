import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import axios from "axios";
import style from "./CreateProject.module.scss";

import LinkButton from "../../components/LinkButton";
import SubmitButton from "../../components/SubmitButton";

export default function CreateProject() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data)
    axios.post('https://ms-academicquest.herokuapp.com/teste', data, {
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className={style.containerForm}>
      <h2 className={style.title}>Criar Projeto</h2>

      <Form onSubmit = { handleSubmit(onSubmit) } className={style.form} >
        <Form.Group>
          <Form.Label htmlFor='name'>Nome</Form.Label>
          <Form.Control name="name" {...register("nome", { required: true })} className={style.inputForm}/>
          {errors.name && <span>Esse campo é obrigatório.</span>}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='description'>Descrição</Form.Label>
          <Form.Control as="textarea" name="description" {...register("descricao", { required: true })} className={style.inputForm}/>
          {errors.description && <span>Esse campo é obrigatório.</span>}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='date'>Data de Entrega</Form.Label>
          <Form.Control type="date" name="date" {...register("data", { required: true })} className={style.inputForm}/>
          {errors.description && <span>Esse campo é obrigatório.</span>}
        </Form.Group>


        <div className={style.menuForm}>
          <LinkButton to="/projects">Voltar</LinkButton>

          <SubmitButton>Criar</SubmitButton>
        </div>
      </Form>
    </div>
  );
}