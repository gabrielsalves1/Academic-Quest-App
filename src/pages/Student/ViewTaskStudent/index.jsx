import React, { useState, useEffect } from "react";
import style from "./ViewTaskStudent.module.scss";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Spinner, ProgressBar } from "react-bootstrap";
import { BsDownload, BsUpload, BsFillFileEarmarkMedicalFill } from "react-icons/bs";

import LinkButton from "../../../components/LinkButton";
import StylizedButton from "../../../components/StylizedButton";
import QuestInfo from "../../../components/QuestInfo";
import Chat from "../../../components/Chat";
import BoxFlexDirectionRow from "../../../components/BoxFlexDirectionRow";
import BoxFlexDirectionColumn from "../../../components/BoxFlexDirectionColumn";
import { getData, postDataFile } from "../../../service/requests";

export default function ViewTask() {
  const [ loading, setLoading ] = useState();
  const { idProject, idQuest, idTaskGroup } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ taskGroup, setTaskGroup ] = useState();
  const [ task, setTask ] = useState();
  const [ file, setFile ] = useState();
  const [ uploadPercentage, setUploadPercentage ] = useState();

  useEffect(() => {
    getData(`/tarefa/grupo/id/${idTaskGroup}`, setTaskGroup, setLoading);
  }, [idTaskGroup]);
  
  useEffect(() => {
    getData(`/tarefas/${taskGroup?.idTarefa}`, setTask, setLoading);
  }, [taskGroup]);

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
      <BoxFlexDirectionColumn>
        <BoxFlexDirectionRow>
          <div className={style.box}>
            { loading && 
              <QuestInfo task={task}/>
            }
          </div>
        </BoxFlexDirectionRow>
        <BoxFlexDirectionRow>
        { loading ? (
          <div className={style.boxGroup}>
            <div className={style.formHalf}>

              <h1 className={style.title}>{taskGroup?.nomeGrupo}</h1>
              <p className={style.titleSecundary}>Quest: <span className={style.text}>{taskGroup?.nomeTarefa}</span> </p>
              <p className={style.titleSecundary}>Data de Entrega: <span className={style.text}>{taskGroup?.dataEntrega ? new Date(Date.parse(taskGroup.dataEntrega)).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "Não entregue"}</span> </p>
            
              { taskGroup?.upload &&
                <div className={style.uploadStudent}>
                  <StylizedButton onClick={() => { Base64ToPdf(taskGroup?.upload["titulo"], taskGroup?.upload["arquivoUpload"], taskGroup?.upload["formato"]) }}>
                    Baixar Arquivo<BsDownload className={style.icon}/>
                  </StylizedButton>
                  
                  <span className={style.text}>{taskGroup?.upload.titulo} <BsFillFileEarmarkMedicalFill className={style.icon}/></span>
                </div>
              }
              
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
                        <span className={style.textUpload}>{file?.name} <BsFillFileEarmarkMedicalFill className={style.icon}/></span>
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
          </div>
        
          ) : (<Spinner className={style.loading} animation="border" variant="primary" />) 
        }

        { loading ? (
          <Chat idTaskGroup={idTaskGroup} idProject={idProject} idQuest={idQuest} messages={taskGroup}/>
        ) : (<Spinner className={style.loading} animation="border" variant="primary" />)}
      </BoxFlexDirectionRow>
    </BoxFlexDirectionColumn>
    </>
  );
}