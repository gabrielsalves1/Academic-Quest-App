import React from "react";
import style from "./ViewTask.module.scss";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Container as ContainerBs, Row, Col } from "react-bootstrap";
import { BsDownload, BsFillEyeFill } from "react-icons/bs";

import api from "../../service/api";
import StylizedLink from "../../components/StylizedLink";
import LinkButton from "../../components/LinkButton";
import StylizedButton from "../../components/StylizedButton";
import Container from "../../components/Container";

export default function ViewTask() {
  const { idProject } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data)
    api.post('https://ms-academicquest.herokuapp.com/teste', data, {
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
      <div className={style.form}>
        <h1 className={style.title}>Teste Grupo</h1>

        <div className={style.menuNameAndDate}>
          <div>
            <h3>Quest</h3>
            <LinkButton to="/">Teste Grupo</LinkButton>
          </div>
          <div>
            <h3>Data de Entrega</h3>
            <span>03/03/2003</span>
          </div>
        </div>
        
        <Form onSubmit = { handleSubmit(onSubmit) }>
          <ContainerBs fluid>
            <Row>
              <Col>
                <StylizedLink to="/projects">Visualizar Arquivo<BsFillEyeFill className={style.icon}/></StylizedLink><br/>
                <LinkButton to="/projects">Baixar Arquivo<BsDownload className={style.icon}/></LinkButton>

                <Form.Group>
                  <Form.Label htmlFor='note'>Nota</Form.Label>
                  <Form.Control name="note" {...register("nota", { required: true })} className={style.inputForm}/>
                  {errors.name && <span>Esse campo é obrigatório.</span>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor='consideration'>Considerações do trabalho</Form.Label>
                  <Form.Control as="textarea" name="consideration" {...register("consideracao", { required: true })} className={style.inputArea}/>
                  {errors.name && <span>Esse campo é obrigatório.</span>}
                </Form.Group>
              </Col>
            </Row>
          </ContainerBs>

          <div className={style.menuForm}>
            <LinkButton to={`/project/${idProject}/evaluate-quest`}>Voltar</LinkButton>

            <StylizedButton type="submit">Aplicar</StylizedButton>
          </div>
        </Form>
      </div>
    </Container>
  );
}