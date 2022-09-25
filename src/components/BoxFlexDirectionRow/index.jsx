import React from "react";
import style from "./BoxFlexDirectionRow.module.scss";

export default function BoxFlexDirectionRow(props) {
  return (
    <div className={style.BoxFlexDirectionRow}>
      
      { props.children }
   
    </div>
  );
}