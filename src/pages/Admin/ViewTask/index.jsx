import React, { useState, useEffect } from "react";
import style from "./ViewTask.module.scss";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Spinner } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";

import StylizedButton from "../../../components/StylizedButton";
import QuestInfo from "../../../components/QuestInfo";
import { getData, putData } from "../../../service/requests";
import ComeBackButtonIcon from "../../../components/ComeBackButtonIcon";

export default function ViewTask() {
  const [ loading, setLoading ] = useState();
  const [ loadingTask, setLoadingTask ] = useState();
  const { idProject, idQuest, idTaskGroup } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ taskGroup, setTaskGroup ] = useState();
  const [ task, setTask ] = useState();

  useEffect(() => {
    getData(`/tarefa/grupo/id/${idTaskGroup}`, setTaskGroup, setLoading);
  }, [idTaskGroup]);

  useEffect(() => {
    getData(`/tarefas/${idQuest}`, setTask, setLoadingTask);
  }, [idQuest]);

  const onSubmit = data => {
    putData(data, `/tarefa/grupo/${idTaskGroup}`, `/project/${idProject}/evaluate-quest/${idQuest}`);
  }

 
  function Base64ToPdf(fileName, base64String, formato) {
    const linkSource = `data:${formato};base64,` + base64String;
    const downloadLink = document.createElement("a");

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  return (
    // Adicionar informações da tarefa da variável "task"

    <>
    <ComeBackButtonIcon url={`/project/${idProject}/evaluate-quest/${idQuest}`}> </ComeBackButtonIcon>

    { loadingTask && 
      <QuestInfo task={task}/>
    }

    <div className={style.box}>
      { loading ? (
      <div className={style.formHalf}>
        <h1 className={style.title}>{taskGroup?.nomeGrupo}</h1>

        <p className={style.titleSecundary}>Data de Entrega: <span className={style.text}>{taskGroup?.dataEntrega ? new Date(Date.parse(taskGroup.dataEntrega)).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "Não entregue"}</span> </p>
        <p className={style.titleSecundary}>Quest: <span className={style.text}>{taskGroup?.nomeTarefa}</span> </p>
        
        <div className={style.alignButton}>
          <StylizedButton onClick={() => { Base64ToPdf(taskGroup?.upload["titulo"], taskGroup?.upload["arquivoUpload"], taskGroup?.upload["formato"]) }}>Baixar Arquivo<BsDownload className={style.icon}/></StylizedButton>
        </div>
        
        <Form onSubmit = { handleSubmit(onSubmit) }>
          <Form.Group>
            <Form.Label className={style.titleTertiary} htmlFor='consideration'>Considerações do trabalho</Form.Label>
            <Form.Control as="textarea" name="consideration" {...register("consideracoes", { required: true })} className={style.inputArea}/>
            {errors.name && <span>Esse campo é obrigatório.</span>}
          </Form.Group>
          
          <Form.Group>
            <Form.Label className={style.titleTertiary} htmlFor='note'>Nota</Form.Label>
            <Form.Control name="note" {...register("nota", { required: true })} className={style.inputForm}/>
            {errors.name && <span>Esse campo é obrigatório.</span>}
          </Form.Group>

          <div className={style.menuForm}>
            <StylizedButton type="submit">Aplicar</StylizedButton>
          </div>
        </Form>
      </div>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }

      {/* { loading ? (
         <Chat idTaskGroup={idTaskGroup} idProject={idProject} idQuest={idQuest} messages={taskGroup}/>
      ) : ("")} */}

     
    </div>

    </>
  );
}