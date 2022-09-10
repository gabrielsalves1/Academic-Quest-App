import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, Image } from "react-bootstrap";
import style from "./Login.module.scss";

import logo from '../../assets/img/logo-academic-quest.png';
import novoLogo from '../../assets/img/logo-academic-quest.svg';
import { Context } from "../../Context/AuthContext";
import { postLogin } from "../../service/requests";
import Container from "../../components/Container";
import StylizedButton from "../../components/StylizedButton";
  
export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ msgError, setMsgError ] = useState();
  const { handleLogin } = useContext(Context);

  const onSubmit = data => {
    let formData = new FormData();
    formData.append('username', data['username']);
    formData.append('password', data['password']);
    formData.append('grant_type', 'password');

    postLogin(formData, handleLogin, setMsgError);
  }

  return (
    <>
    <div className={style.containerLogin}>
      <div className={style.boxLogo}>
        <Image fluid src={novoLogo} className={style.novoLogoStyle}/>

       <span className={style.madeBy}>Made By Os Fumacas&Co 😎</span> 
      </div>
      
      <div className={style.boxLogin}>
        <Form onSubmit = { handleSubmit(onSubmit) } className={style.formLogin}>
          <Form.Group>
            <Form.Label htmlFor="username" className={style.fontPlaceholder}>E-mail</Form.Label>
            <Form.Control name="username" {...register("username", { required: true })}
              placeholder="E-mail" className={style.inputFormLogin}/>
            {errors.username && <span className={style.error}>Esse campo é obrigatório.</span>}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="password" className={style.fontPlaceholder}>Senha</Form.Label>
            <Form.Control type="password" name="password" {...register("password", { required: true })}
              placeholder="Senha" className={style.inputFormLogin}/>
            {errors.password && <span className={style.error}>Esse campo é obrigatório.</span>}
          </Form.Group>

          {msgError && <span className={style.error}>{msgError} <br/></span>}
          <button type="submit" className={style.btnLogin}>Entrar</button>
        </Form>
      </div>
    </div>
    </>
  );
}