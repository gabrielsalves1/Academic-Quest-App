import React from "react";
import style from "./Container.module.scss";

export default function Container(props) {
  return (
    <div className={`${props.classStyle === 'containerJustifyCenter' ? style.containerJustifyCenter : style.containerAlignCenter }`}>
      { props.children }
    </div>
  );
}