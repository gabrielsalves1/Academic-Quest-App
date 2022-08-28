import React, { useState, useEffect } from "react";
import style from "./ViewTaskStudent.module.scss";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Spinner } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";

import api from "../../../service/api";
import LinkButton from "../../../components/LinkButton";
import StylizedButton from "../../../components/StylizedButton";
import Container from "../../../components/Container";
import { getData } from "../../../service/requests";

export default function ViewTask() {
  const [ loading, setLoading ] = useState();
  const { idTaskGroup } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ taskGroup, setTaskGroup ] = useState();

  useEffect(() => {
    getData(`/tarefa/grupo/id/${idTaskGroup}`, setTaskGroup, setLoading);
  }, [idTaskGroup]);

  const onSubmit = data => {
    api.put(`/tarefa/grupo/${idTaskGroup}`, data, {
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  function Base64ToPdf(fileName, base64String, formato) {
    const linkSource = `data:${formato};base64,` + base64String;
    const downloadLink = document.createElement("a");

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  return (
    <Container classStyle="containerJustifyCenter">
      { loading ? (
      <div className={style.form}>
        <h1 className={style.title}>{taskGroup?.nomeGrupo}</h1>

        <div className={style.menuNameAndDate}>
          <h3 className={style.titleSecundary}>Quest {taskGroup?.nomeTarefa}</h3>

          <div>
            <h3 className={style.titleSecundary}>Data de Entrega</h3>
            <span className={style.titleSecundary}>
              {taskGroup?.dataEntrega ? new Date(Date.parse(taskGroup.dataEntrega)).toLocaleDateString() : " - "}
            </span>
          </div>

          <StylizedButton onClick={() => { Base64ToPdf(taskGroup?.upload["titulo"], taskGroup?.upload["arquivoUpload"], taskGroup?.upload["formato"]) }}>Baixar Arquivo<BsDownload className={style.icon}/></StylizedButton>
        </div>
        
        <Form onSubmit = { handleSubmit(onSubmit) }>
          <Form.Group>
            <Form.Label htmlFor='consideration'>Considerações do trabalho</Form.Label>
            <Form.Control as="textarea" name="consideration" {...register("consideracoes", { required: true })} className={style.inputArea}/>
            {errors.name && <span>Esse campo é obrigatório.</span>}
          </Form.Group>
          
          <Form.Group>
            <Form.Label htmlFor='note'>Nota</Form.Label>
            <Form.Control name="note" {...register("nota", { required: true })} className={style.inputForm}/>
            {errors.name && <span>Esse campo é obrigatório.</span>}
          </Form.Group>

          <div className={style.menuForm}>
            <LinkButton to={`/projects`}>Voltar</LinkButton>

            <StylizedButton type="submit">Aplicar</StylizedButton>
          </div>
        </Form>
      </div>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
    </Container>
  );
}