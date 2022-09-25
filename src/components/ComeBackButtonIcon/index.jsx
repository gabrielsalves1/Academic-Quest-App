import React from "react";
import { Button } from "react-bootstrap";
import style from "./ComeBackButtonIcon.module.scss";
import { FiArrowLeft } from "react-icons/fi";

export default function ComeBackButtonIcon(props) {
  return (
    <div className={style.boxButton}>
      <a href={props.url}>
        <FiArrowLeft className={style.comeBackIcon} />
      </a>
    </div>
  );
}