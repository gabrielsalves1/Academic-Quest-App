import React, { useState, useEffect } from "react";
import style from "./ViewTaskStudent.module.scss";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Spinner, ProgressBar } from "react-bootstrap";
import { BsDownload, BsUpload } from "react-icons/bs";

import api from "../../../service/api";
import LinkButton from "../../../components/LinkButton";
import StylizedButton from "../../../components/StylizedButton";
import Container from "../../../components/Container";
import { getData, postDataFile } from "../../../service/requests";

export default function ViewTask() {
  const [ loading, setLoading ] = useState();
  const { idTaskGroup } = useParams();
  const { handleSubmit, formState: { errors } } = useForm();
  const [ taskGroup, setTaskGroup ] = useState();
  const [ file, setFile ] = useState();
  const [ uploadPercentage, setUploadPercentage ] = useState();

  useEffect(() => {
    getData(`/tarefa/grupo/id/${idTaskGroup}`, setTaskGroup, setLoading);
  }, [idTaskGroup]);

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const onSubmit = data => {
    let formData = new FormData();
    formData.append('arquivoUploadEntrega', file);
    formData.append('tarefaGrupoId', idTaskGroup);

    postDataFile('/aluno/entregar', formData, `/view-task/${idTaskGroup}`, setUploadPercentage);
  }

  function Base64ToPdf(fileName, base64String, formato) {
    const linkSource = `data:${formato};base64,` + base64String;
    const downloadLink = document.createElement("a");

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  return (
    <Container classStyle="containerJustifyCenter">
      { loading ? (
        <div className={style.form}>
          <h1 className={style.title}>{taskGroup?.nomeGrupo}</h1>
        
          <div className={style.menuNameAndDate}>
            <h3 className={style.titleSecundary}>{taskGroup?.nomeTarefa}</h3>
        
            <div>
              <h3 className={style.titleSecundary}>Data de Entrega</h3>
              <span className={style.titleSecundary}>
                {taskGroup?.dataEntrega ? new Date(Date.parse(taskGroup.dataEntrega)).toLocaleDateString() : " - "}
              </span>
            </div>
        
            { taskGroup?.upload &&
              <StylizedButton onClick={() => { Base64ToPdf(taskGroup?.upload["titulo"], taskGroup?.upload["arquivoUpload"], taskGroup?.upload["formato"]) }}>
                Baixar Arquivo<BsDownload className={style.icon}/>
              </StylizedButton>
            }
          </div>
          
          <Form onSubmit = { handleSubmit(onSubmit) }>
            <Form.Group>
              <Form.Label htmlFor='consideration'>Considerações do trabalho</Form.Label>
              <Form.Control defaultValue={taskGroup?.consideracoes} as="textarea" name="consideration" className={style.inputArea} readOnly/>
              {errors.name && <span>Esse campo é obrigatório.</span>}
            </Form.Group>
            
            <Form.Group>
              <Form.Label htmlFor='note'>Nota</Form.Label>
              <Form.Control defaultValue={taskGroup?.nota} name="note" className={style.inputForm} readOnly/>
              {errors.name && <span>Esse campo é obrigatório.</span>}
            </Form.Group>
          
            <Form.Group controlId="formFile" className="mt-2 mb-2" htmlFor='file'>
              <Form.Label className={style.inputFile}>Carregar arquivo<BsUpload className={style.icon}/></Form.Label>
              <Form.Control type="file" name="file" onChange={(e) => {
                handleFile(e)
              }}/>
              { uploadPercentage > 0 && <ProgressBar now={uploadPercentage} label={`${uploadPercentage}%`} animated />}
            </Form.Group>
            
            <div className={style.menuForm}>
              <LinkButton to={`/projects`}>Voltar</LinkButton>
            
              <StylizedButton type="submit">Enviar</StylizedButton>
            </div>
          </Form>
        </div>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
    </Container>
  );
}