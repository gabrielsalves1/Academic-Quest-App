import React from "react";
import style from "./Page404.module.scss";
import { IoAlertCircleSharp } from "react-icons/io5";

import Container from "../../components/Container";

export default function Page404() {
  return (
    <Container classStyle="containerJustifyCenter">
      <IoAlertCircleSharp className={style.icon}/>
      <h1 className={style.msg}>Página não encontrada ou você não possui permissão para visualizá-la.</h1>
    </Container>
  );
}