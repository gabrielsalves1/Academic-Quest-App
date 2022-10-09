import React, { useState, useEffect } from "react";
import style from "./Home.module.scss";


import NewContainer from "../../../components/NewContainer";
import { FaFolder } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";


export default function Home() {
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
        <a href="/groups">   
          <div className={style.box}>
            <span className={style.nomeMenu}> Grupos</span>
            <HiUserGroup className={style.iconMenuGroup} />
          </div>
        </a>
      </div>
      <div>
        <a href="/dashboard">   
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