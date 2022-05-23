import React, { useState } from "react";
import style from "./ViewTask.module.scss";
import { useForm } from "react-hook-form";
import { Form, Container, Row, Col } from "react-bootstrap";
import { BsDownload, BsFillEyeFill } from "react-icons/bs";
import axios from "axios";

import StylizedLink from "../../components/StylizedLink";
import LinkButton from "../../components/LinkButton";
import SubmitButton from "../../components/SubmitButton";

export default function ViewTask() {
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
    <div className={style.containerViewTask}>
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
          <Container fluid>
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
          </Container>

          <div className={style.menuForm}>
            <LinkButton to="/evaluate-quest">Voltar</LinkButton>

            <SubmitButton>Aplicar</SubmitButton>
          </div>
        </Form>
      </div>
    </div>
  );
}