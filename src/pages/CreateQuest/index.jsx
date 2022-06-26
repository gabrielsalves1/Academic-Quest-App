import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import style from "./CreateQuest.module.scss";

import api from "../../service/api";
import Container from "../../components/Container";
import StylizedButton from "../../components/StylizedButton";
import LinkButton from "../../components/LinkButton";

export default function CreateQuest() {
  const { idProject } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ file, setFile ] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const onSubmit = data => {
    let formData = new FormData();
    formData.append('arquivoUpload', file);
    formData.append('nome', data["nome"])
    formData.append('idProjeto', idProject)
    formData.append('descricao', data["descricao"])
    formData.append('dataEntrega', data["dataEntrega"])
    api.post('/tarefas', formData, {
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <Container classStyle="containerJustifyCenter">
      <h2 className={style.title}>Criar Quest</h2>

      <Form onSubmit = { handleSubmit(onSubmit) } className={style.form} >
        <Form.Group className="mt-2 mb-2">
          <Form.Label htmlFor='name'>Nome</Form.Label>
          <Form.Control name="name" {...register("nome", { required: true })} className={style.inputForm}/>
          {errors.nome && <span>Esse campo é obrigatório.</span>}
        </Form.Group>

        <Form.Group className="mt-2 mb-2">
          <Form.Label htmlFor='description'>Descrição</Form.Label>
          <Form.Control as="textarea" name="description" {...register("descricao", { required: true })} className={style.inputForm}/>
          {errors.descricao && <span>Esse campo é obrigatório.</span>}
        </Form.Group>

        <div className={style.alignDateAndFile}>
          <Form.Group className="mt-2 mb-2">
            <Form.Label htmlFor='date'>Data de Entrega</Form.Label>
            <Form.Control type="date" name="date" {...register("dataEntrega", { required: true })} className={style.inputForm}/>
            {errors.data && <span>Esse campo é obrigatório.</span>}
          </Form.Group>

          <Form.Group controlId="formFile" className="mt-2 mb-2" htmlFor='file'>
            <Form.Label className={style.inputFile}>Carregar arquivo<BsUpload className={style.icon}/></Form.Label>
            <Form.Control type="file" name="file" onChange={(e) => {
              handleFile(e)
            }}/>
          </Form.Group>
        </div>

        <div className={style.menuForm}>
          <LinkButton to={`/project/${idProject}/quest-management`}>Voltar</LinkButton>

          <StylizedButton type="submit">Salvar</StylizedButton>
        </div>
      </Form>
    </Container>
  );
}