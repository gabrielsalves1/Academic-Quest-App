import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, ProgressBar } from "react-bootstrap";
import { BsUpload, BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import style from "./CreateQuest.module.scss";

import NewContainer from "../../../components/NewContainer";
import ComeBackButtonIcon from "../../../components/ComeBackButtonIcon";
import StylizedButton from "../../../components/StylizedButton";
import BoxResult from "../../../components/BoxResult";
import BoxFlexDirectionColumn from "../../../components/BoxFlexDirectionColumn";
import { postDataFile } from "../../../service/requests";

export default function CreateQuest() {
  const { idProject } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ file, setFile ] = useState();
  const [ uploadPercentage, setUploadPercentage ] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const onSubmit = data => {
    let formData = new FormData();
    formData.append('arquivoUpload', file);
    formData.append('nome', data["nome"]);
    formData.append('projetoId', idProject);
    formData.append('descricao', data["descricao"]);
    formData.append('dataEntrega', data["dataEntrega"]);
    
    postDataFile('/tarefas', formData, `/project/${idProject}/quest-management`, setUploadPercentage);
  }

  return (
    <NewContainer classStyle="containerJustifyCenter">
      <ComeBackButtonIcon url={ `/project/${idProject}/quest-management`}> </ComeBackButtonIcon>
      <h2 className={style.title}>Criar Quest</h2>
      <BoxResult>
        <BoxFlexDirectionColumn>
          <Form onSubmit = { handleSubmit(onSubmit) } className={style.form} >
            <Form.Group className="mt-2 mb-2">
              <Form.Label htmlFor='name' className={style.subtitle}>Nome</Form.Label>
              <Form.Control name="name" {...register("nome", { required: true })} className={style.inputForm}/>
              {errors.nome && <span className={style.error}>Esse campo é obrigatório.</span>}
            </Form.Group>

            <Form.Group className="mt-2 mb-2">
              <Form.Label htmlFor='description' className={style.subtitle}>Descrição</Form.Label>
              <Form.Control as="textarea" name="description" {...register("descricao", { required: true })} className={style.inputForm}/>
              {errors.descricao && <span className={style.error}>Esse campo é obrigatório.</span>}
            </Form.Group>

            <div className={style.alignDateAndFile}>
              <Form.Group className="mt-2 mb-2">
                <Form.Label htmlFor='date' className={style.subtitle}>Data de Entrega</Form.Label>
                <Form.Control type="date" name="date" {...register("dataEntrega", { required: true })} className={style.inputForm}/>
                {errors.data && <span className={style.error}>Esse campo é obrigatório.</span>}
              </Form.Group>

              <Form.Group controlId="formFile" className="mt-2 mb-2" htmlFor='file'>
                { file &&
                  <span className={style.text}>{file?.name} <BsFillFileEarmarkMedicalFill className={style.icon}/></span>
                }
                
                <Form.Label className={style.inputFile}>Adicionar Arquivo<BsUpload className={style.icon}/></Form.Label>
                <Form.Control type="file" name="file" onChange={(e) => {
                  handleFile(e)
                }}/>
                { uploadPercentage > 0 && <ProgressBar now={uploadPercentage} label={`${uploadPercentage}%`} animated />}
              </Form.Group>
            </div>

            <div className={style.menuForm}>
            

              <StylizedButton type="submit">Salvar</StylizedButton>
            </div>
          </Form>
        </BoxFlexDirectionColumn>
      </BoxResult>
    </NewContainer>
  );
}