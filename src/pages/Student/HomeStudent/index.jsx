import React from "react";
import style from "./HomeStudent.module.scss";

import Container from "../../../components/Container";
import About from "../../../components/About";
import ToDoListByStudent from "../../../components/ToDoListByStudent";
import LinkButton from "../../../components/LinkButton";
import StylizedA from "../../../components/StylizedA";
import { useEffect } from "react";
import { useState } from "react";

import NewContainer from "../../../components/NewContainer";
import { FaFolder, FaTasks } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";

export default function HomeStudent() {
  const [ username, setUsername ] = useState();

  useEffect(() => {
    setUsername(sessionStorage.getItem('userFirstName'));
  }, [])

  return (
    <NewContainer classStyle="containerDirectionRow">

      <h2 className={style.subtitle}>Olá, {username}!</h2>

      <div className={style.containerBoxFlexDirectionRow}>
        <div>
          <a href="/projects">   
            <div className={style.box}>
              <span className={style.nomeMenu}> Projetos</span>
              <FaFolder className={style.iconMenuFolder} />
            </div>
          </a>
        </div>
        <div>
        <a href="/dashboard-aluno">   
          <div className={style.box}>
            <span className={style.nomeMenu}> Dashboard</span>
            <BsBarChartFill className={style.iconMenuGrid} />
          </div>
        </a>
        </div>
      </div>
    </NewContainer>
  );
}