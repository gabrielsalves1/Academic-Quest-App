import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import { Form } from "react-bootstrap";
import style from "./EditGroup.module.scss";

import api from "../../service/api";
import history from '../../service/history';
import { getData } from "../../service/requests";
import Container from "../../components/Container";
import LinkButton from "../../components/LinkButton";
import StylizedButton from "../../components/StylizedButton";

export default function EditGroup() {
  const [ loading, setLoading ] = useState();
  const { idGroup } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ group, setGroup ] = useState();


  const onSubmit = data => {
    data['listaAlunosId'] = group.listaAlunos;
    data['materiaId'] = group.materiaId;
    data['alunoLiderId'] = group.alunoLiderId;

    api.put(`/grupos/${group.id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.status === 201) {
        history.push('/groups');
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getData(`/grupos/${idGroup}`, setGroup, setLoading);
  }, [idGroup]);
  
  return (
    <Container classStyle="containerJustifyCenter">
      <h2 className={style.title}>Editar Grupo</h2>

      <div className={style.integrants}>
        <h2 className={style.title}>Integrantes</h2>
        { group?.listaAlunos.map((student) => {
            if(student.id === group.alunoLiderId) {
              return (
                <span key={student.id}><FaCrown className={style.iconPurple}/>{student.firstName} {student.lastName}</span>
              );
            } else {
              return (
                <span key={student.id}><BsFillPersonFill className={style.icon}/>{student.firstName} {student.lastName}</span>
              );
            }
          })
        }
      </div>
      
      <Form className={style.form} onSubmit = { handleSubmit(onSubmit) }>
        <Form.Group>
          <Form.Label className={style.label} htmlFor="name">Nome do Grupo</Form.Label>
          <Form.Control name="name" {...register("nome", { required: true })} className={style.inputForm}/>
          {errors.nome && <p className={style.error}>Este campo é obrigatório.</p>}
        </Form.Group>

        <div className={style.menuForm}>
          <LinkButton to="/groups">Voltar</LinkButton>

          <StylizedButton type="submit">Salvar</StylizedButton>
        </div>
      </Form>
    </Container>
  );
}