import React from "react";
import style from "./BoxFlexDirectionColumn.module.scss";

export default function BoxFlexDirectionColumn(props) {
  return (
    <div className={style.BoxFlexDirectionColumn}>
      
      { props.children }
   
    </div>
  );
}