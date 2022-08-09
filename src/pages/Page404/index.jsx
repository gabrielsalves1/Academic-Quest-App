import React from "react";
import style from "./Page404.module.scss";
import { IoAlertCircleSharp } from "react-icons/io5";

import Container from "../../components/Container";
import LinkButton from "../../components/LinkButton";

export default function Page404() {
  return (
    <Container classStyle="containerJustifyCenter">
      <h2 className={style.msg}>Página não encontrada ou você não possui permissão para visualizá-la <IoAlertCircleSharp className={style.icon}/></h2>
      { !sessionStorage.getItem('token') &&
        <h2 className={style.msg}>Caso não tenha iniciado sua sessão, <LinkButton to="/login">Clique aqui</LinkButton></h2>
      }
    </Container>
  );
}