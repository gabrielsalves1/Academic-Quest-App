import React from "react";
import style from "./ComeBackButtonIcon.module.scss";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ComeBackButtonIcon(props) {
  return (
    <div className={style.boxButton}>
      <Link to={props.url}>
        <FiArrowLeft className={style.comeBackIcon} />
      </Link>
    </div>
  );
}