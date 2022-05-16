import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import api from "../../service/api";
import style from "./Login.module.scss";

import { Context } from "../../Context/AuthContext";
import SubmitButton from "../../components/SubmitButton";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { authenticated, handleLogin } = useContext(Context);
  console.log('Login', authenticated);

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
    <div className={style.containerForm}>
      <h2 className={style.title}>Entrar no Academic Quest</h2>

      <Form onSubmit = { handleSubmit(onSubmit) } className={style.form}>
        <Form.Group>
          <Form.Label htmlFor="username">E-mail</Form.Label>
          <Form.Control name="username" {...register("username", { required: true })}
            placeholder="E-mail" className={style.inputForm}/>
          {errors.name && <span>Esse campo é obrigatório.</span>}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Senha</Form.Label>
          <Form.Control type="password" name="password" {...register("password", { required: true })}
            placeholder="Senha" className={style.inputForm}/>
          {errors.description && <span>Esse campo é obrigatório.</span>}
        </Form.Group>

        <SubmitButton>Entrar</SubmitButton>
      </Form>
    </div>
  );
}