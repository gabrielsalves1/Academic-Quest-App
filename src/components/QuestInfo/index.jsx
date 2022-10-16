import React from "react";
import style from "./QuestInfo.module.scss";
import { BsDownload, BsFillFileEarmarkMedicalFill } from "react-icons/bs";

import StylizedButton from "../StylizedButton";
import BoxFlexDirectionColumn from "../BoxFlexDirectionColumn";

export default function QuestInfo(props) {

    function Base64ToPdf(fileName, base64String, formato) {
      const linkSource = `data:${formato};base64,` + base64String;
      const downloadLink = document.createElement("a");
    
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }

    return (
      <div className={style.formHalf}>
      { props.task && 
          <BoxFlexDirectionColumn>
            
              <div className="questSection">
                <h1 className={style.title}> {props.task?.nome}</h1>
                <h2 className={style.titleSecundary}>Descrição:  <span className={style.textBody}>{props.task?.descricao}</span></h2>
                <h2 className={style.titleSecundary}>Data de Entrega:  <span className={style.textBody}>{new Date(Date.parse(props.task?.dataEntrega)).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</span></h2>
        
                <div className={style.questInfo}>
                  <StylizedButton onClick={() => { Base64ToPdf(props.task.nomeArquivo, props.task.upload, props.task.formato) }}>Baixar Arquivo<BsDownload className={style.icon}/></StylizedButton>
                  { props.task?.nomeArquivo &&
                    <span className={style.titleTertiary}>{props.task.nomeArquivo} <BsFillFileEarmarkMedicalFill className={style.icon}/></span>
                  }
                </div>
              </div>
                
          </BoxFlexDirectionColumn>
      }
      </div>
    );
}