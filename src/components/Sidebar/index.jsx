import React, { useState, useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Image } from "react-bootstrap";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { BsBarChartFill } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import style from './Sidebar.module.scss';

import { Context } from "../../Context/AuthContext";
import iconLogo from '../../assets/img/icon-academic-quest.svg';

export default function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { handleLogout } = useContext(Context);
  const [ userFirstName, setUserFirstName] = useState(sessionStorage.getItem('userFirstName'));
  const [ userRole, setUserRole ] = useState(sessionStorage.getItem('role'));


  return (
    <>
      <div className={style.sidebarClosed}>
      <div className={style.boxHeader}>
        <div>
          <Image fluid src={iconLogo} className={style.novoLogoStyle}/>
        </div>

        <div className={style.boxIcon}>
          <HiChevronDoubleRight onClick={handleShow} className={style.iconStyle} data-testid="sidebar"/>
        </div>
      </div>

        

        <div className={style.containerLittleBoxMenu}>
          <a href='/' className={style.littleBoxMenu}>
            <AiFillHome className={style.iconMenuHome} />
          </a>
          <a href='/dashboard' className={style.littleBoxMenu}>
            <BsBarChartFill className={style.iconMenuGrid} />
          </a>
          <a  href='/projects' className={style.littleBoxMenu}>
            <FaFolder className={style.iconMenuFolder} />
          </a>
          <a  href='/groups' className={style.littleBoxMenu}>
            <HiUserGroup className={style.iconMenuGroup} />
          </a>
        </div>

        
        <span onClick={handleLogout} className={style.sair}>
          Sair
          <MdLogout className={style.iconSair}/>
        </span>
      </div>

      <Offcanvas show={show} onHide={handleClose} className={style.sidebarOpen}>
        <div className={style.boxHeader}>
          <div>
            <Image fluid src={iconLogo} className={style.novoLogoStyle}/>
          </div>
          <span className={style.academicQuest}>Academic <br/> Quest</span>
          <div>
            <HiChevronDoubleLeft onClick={handleClose} className={style.iconStyle} data-testid="sidebar"/>
          </div>
        </div>
        
        <div className={style.divCenter}>
          <div className={style.boxName}>
            <p className={style.userFirstName}>{userFirstName}</p>
            <p className={style.userRole}>
              {userRole == "PROFESSOR" ? "Professor" : "Aluno"}
            </p>
          </div>
        
          <div className={style.containerLittleBoxMenu}>
            <a href='/' className={style.boxMenu}>
              <AiFillHome className={style.iconMenuHome} />
              <span className={style.nameMenuHome}>Home</span>
            </a>
            <a href='/dashboard' className={style.boxMenu}>
              <BsBarChartFill className={style.iconMenuGrid} />
              <span className={style.nameMenuGrid}>Dashboard</span>
            </a>
            <a  href='/projects' className={style.boxMenu}>
              <FaFolder className={style.iconMenuFolder} />
              <span className={style.nameMenuFolder}>Projetos</span>
            </a>
            <a  href='/groups' className={style.boxMenu}>
              <HiUserGroup className={style.iconMenuGroup} />
              <span className={style.nameMenuGroup}>Grupos</span>
            </a>
          </div>
        </div>


        <span onClick={handleLogout} className={style.sair}>
          Sair
          <MdLogout className={style.iconSair}/>
        </span>
      </Offcanvas>
    </>
  );
}