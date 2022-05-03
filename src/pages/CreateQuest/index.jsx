import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import axios from "axios";
import style from "./CreateQuest.module.scss";

import SubmitButton from "../../components/SubmitButton";
import LinkButton from "../../components/LinkButton";

export default function CreateQuest() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ file, setFile ] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

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
      <h2 className={style.title}>Criar Quest</h2>

      <Form onSubmit = { handleSubmit(onSubmit) } className={style.form} >
        <Form.Group className="mt-2 mb-2">
          <Form.Label htmlFor='name'>Nome</Form.Label>
          <Form.Control name="name" {...register("nome", { required: true })} className={style.inputForm}/>
          {errors.name && <span>Esse campo é obrigatório.</span>}
        </Form.Group>

        <Form.Group className="mt-2 mb-2">
          <Form.Label htmlFor='description'>Descrição</Form.Label>
          <Form.Control as="textarea" name="description" {...register("descricao", { required: true })} className={style.inputForm}/>
          {errors.description && <span>Esse campo é obrigatório.</span>}
        </Form.Group>

        <div className={style.alignDateAndFile}>
          <Form.Group className="mt-2 mb-2">
            <Form.Label htmlFor='date'>Data de Entrega</Form.Label>
            <Form.Control type="date" name="date" {...register("data", { required: true })} className={style.inputForm}/>
            {errors.description && <span>Esse campo é obrigatório.</span>}
          </Form.Group>

          <Form.Group controlId="formFile" className="mt-2 mb-2" htmlFor='file'>
            <Form.Label className={style.inputFile}>Carregar arquivo<BsUpload/></Form.Label>
            <Form.Control type="file" name="file" onChange={(e) => {
              handleFile(e)
            }}/>
          </Form.Group>
        </div>

        <div className={style.menuForm}>
          <LinkButton url="/quest-management">Voltar</LinkButton>

          <SubmitButton>Salvar</SubmitButton>
        </div>
      </Form>
    </div>
  );
}