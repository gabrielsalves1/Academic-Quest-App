import React, { useState, useEffect } from "react";
import style from "./ViewTaskStudent.module.scss";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Spinner, ProgressBar } from "react-bootstrap";
import { BsDownload, BsUpload, BsFillFileEarmarkMedicalFill } from "react-icons/bs";

import LinkButton from "../../../components/LinkButton";
import StylizedButton from "../../../components/StylizedButton";
import Container from "../../../components/Container";
import { getData, postDataFile } from "../../../service/requests";
import Chat from "../../../components/Chat";

export default function ViewTask() {
  const [ loading, setLoading ] = useState();
  const { idProject, idQuest, idTaskGroup } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ taskGroup, setTaskGroup ] = useState();
  const [ file, setFile ] = useState();
  const [ uploadPercentage, setUploadPercentage ] = useState();

  useEffect(() => {
    getData(`/tarefa/grupo/id/${idTaskGroup}`, setTaskGroup, setLoading);
  }, [idTaskGroup]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
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
    <>
    <div className={style.box}>
      { loading ? (
        <div className={style.formHalf}>
          <h1 className={style.title}>{taskGroup?.nomeGrupo}</h1>
          <h3 className={style.titleSecundary}>{taskGroup?.nomeTarefa}</h3>
        
          <div className={style.menuNameAndDate}>
        
            <div>
              <h3 className={style.titleSecundary}>Data de Entrega</h3>
              <span className={style.titleSecundary}>
                {taskGroup?.dataEntrega ? new Date(Date.parse(taskGroup.dataEntrega)).toLocaleDateString() : " - "}
              </span>
            </div>
        
            { taskGroup?.upload &&
              <div className={style.uploadStudent}>
                <StylizedButton onClick={() => { Base64ToPdf(taskGroup?.upload["titulo"], taskGroup?.upload["arquivoUpload"], taskGroup?.upload["formato"]) }}>
                  Baixar Arquivo<BsDownload className={style.icon}/>
                </StylizedButton>
                
                <span className={style.text}>{taskGroup?.upload.titulo} <BsFillFileEarmarkMedicalFill className={style.icon}/></span>
              </div>
            }
          </div>
          
          <Form onSubmit = { handleSubmit(onSubmit) }>
            <div className={style.menuDiv}>
              <div className={style.menuSide}>
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
              </div>

              <div className={style.menuSide}>
                <div className={style.uploadStudent}>
                  { file &&
                    <span className={style.text}>{file?.name} <BsFillFileEarmarkMedicalFill className={style.icon}/></span>
                  }

                  <Form.Group controlId="formFile" className="mt-2 mb-2" htmlFor='file'>
                    <Form.Label className={style.inputFile}>Adicionar<BsUpload className={style.icon}/></Form.Label>
                    <Form.Control type="file" name="file" onChange={(e) => {
                      handleFile(e)
                    }}/>
                    { uploadPercentage > 0 && <ProgressBar now={uploadPercentage} label={`${uploadPercentage}%`} animated />}
                  </Form.Group>
                </div>
              </div>
            </div>

            <div className={style.menuForm}>
              <LinkButton to={`/projects`}>Voltar</LinkButton>
            
              <StylizedButton type="submit">Enviar</StylizedButton>
            </div>
          </Form>
        </div>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }

      { loading ? (
         <Chat idTaskGroup={idTaskGroup} idProject={idProject} idQuest={idQuest} messages={taskGroup}/>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />)}
    </div>
    </>
  );
}