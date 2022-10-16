import React, { useState, useEffect } from "react";
import style from "./Home.module.scss";

import { Link } from "react-router-dom";
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
        <Link to="/projects">   
          <div className={style.box}>
            <span className={style.nomeMenu}> Projetos</span>
            <FaFolder className={style.iconMenuFolder} />
          </div>
        </Link>
      </div>
      <div>
        <Link to="/groups">   
          <div className={style.box}>
            <span className={style.nomeMenu}> Grupos</span>
            <HiUserGroup className={style.iconMenuGroup} />
          </div>
        </Link>
      </div>
      <div>
        <Link to="/dashboard">   
          <div className={style.box}>
            <span className={style.nomeMenu}> Dashboard</span>
            <BsBarChartFill className={style.iconMenuGrid} />
          </div>
        </Link>
      </div>
    </div>
    </NewContainer>
  );
}