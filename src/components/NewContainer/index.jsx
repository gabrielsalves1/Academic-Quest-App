import React from "react";
import style from "./NewContainer.module.scss";

export default function NewContainer(props) {
  return (
    <div className={style.newContainer}>
      <div className={style.newContainerChild}>
        { props.children }
      </div>
    </div>
  );
}