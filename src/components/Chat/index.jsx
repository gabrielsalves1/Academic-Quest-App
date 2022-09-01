import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import style from "./Chat.module.scss";
import ChatButton from "../ChatButton";
import MessageBalloonSent from "../MessageBalloonSent";
import MessageBalloonIncoming from "../MessageBalloonIncoming";

import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Spinner } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";

import api from "../../service/api";
import history from "../../service/history";
import LinkButton from "../LinkButton";
import StylizedButton from "../StylizedButton";


import Container from "../Container";
import { getData, postMessageChat } from "../../service/requests";
import { RiSendPlane2Fill } from "react-icons/ri";

export default function Chat(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ messages, setMessages ] = useState(props.messages.chats);

  const idUser = sessionStorage.getItem('idUser')

  const onSubmit = message => {
    const msg = message
    const data = {
      "mensagem": msg.mensagem,
      "tarefaGrupoId": props.idTaskGroup,
      "userId": idUser
    }

    postMessageChat(data, `/project/${props.idProject}/view-task/${props.idQuest}/task-group/${props.idTaskGroup}`)
  }



  return (
    <>
        <div className={style.containerChat}>
            <div className={style.chatBox} >
              <div id="scroll" className={style.chatBoxScroll}>
                {(messages.length > 0 ) ? (
                  messages.map((msg) => {
                    return (
                      <div key={msg.id} className={style.marginTopChat}>
                        <MessageBalloonSent message={msg.mensagem} nickName={msg.primeiroNome + ' ' + msg.segundoNome}/>
                      </div>
                    )
                  })
                ) : 
                (<div className={style.boxWithoutMsg}>
                  <span className={style.textWithoutMsg}> Não há mensagens!</span>
                </div>)}
              </div>
            
              <Form onSubmit = { handleSubmit(onSubmit) }>
                <div className={style.displayFlexRow}>
                  <>
                    <Form.Group>
                      <Form.Control as="textarea" name="mensagem"  {...register("mensagem", { required: true })} className={style.chatInputArea}/>
                    </Form.Group>
                  </>
                  <div className={style.boxBtnSend}>
                    <button type="submit" className={style.button}><RiSendPlane2Fill className={style.icon}/></button>
                  </div>
                </div>
              </Form>
            </div>
        </div>
    </>
  );
}