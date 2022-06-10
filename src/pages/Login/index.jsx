import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Image } from "react-bootstrap";
import style from "./Login.module.scss";

import logo from '../../assets/img/logo-academic-quest.png';
import api from "../../service/api";
import { Context } from "../../Context/AuthContext";
import Container from "../../components/Container";
import StylizedButton from "../../components/StylizedButton";
  
export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleLogin } = useContext(Context);

  const onSubmit = data => {
    let formData = new FormData();
    formData.append('username', data['username']);
    formData.append('password', data['password']);
    formData.append('grant_type', 'password');

    api.post('/oauth/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 
        Authorization: 'Basic ' + window.btoa('academicquest:ricardosilvagostadexbox')
      }
    })
    .then((res) => {
      handleLogin(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <Container classStyle="containerJustifyCenter">
      <Image fluid src={logo} className={style.logo}/>
      <h2 className={style.title}>Entrar no Academic Quest</h2>

      <Form onSubmit = { handleSubmit(onSubmit) } className={style.form}>
        <Form.Group>
          <Form.Label htmlFor="username">E-mail</Form.Label>
          <Form.Control name="username" {...register("username", { required: true })}
            placeholder="E-mail" className={style.inputForm}/>
          {errors.username && <span>Esse campo é obrigatório.</span>}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Senha</Form.Label>
          <Form.Control type="password" name="password" {...register("password", { required: true })}
            placeholder="Senha" className={style.inputForm}/>
          {errors.password && <span>Esse campo é obrigatório.</span>}
        </Form.Group>

        <StylizedButton type="submit">Entrar</StylizedButton>
      </Form>
    </Container>
  );
}