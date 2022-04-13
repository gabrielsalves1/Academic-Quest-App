import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import style from "./QuestForm.module.scss";

export default function QuestForm() {
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
    <div className={style.containerForm}>
      <h2>Criar Quest</h2>

      <Form onSubmit = { handleSubmit(onSubmit) } className={style.form} >
        <Form.Group>
          <Form.Label htmlFor='name'>Nome</Form.Label>
          <Form.Control name="name" {...register("nome", { required: true })}/>
          {errors.name && <span>Esse campo é obrigatório.</span>}
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3" htmlFor='activityFile'>
          <Form.Label>Arquivo</Form.Label>
          <Form.Control type="file" name="activityFile" onChange={(e) => {
            handleFile(e)
          }}/>
        </Form.Group>

        <br/>
        <Button type="submit" value='Salvar'>Salvar</Button>
      </Form>
    </div>
  );
}