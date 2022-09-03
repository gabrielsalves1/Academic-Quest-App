import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HiChevronDoubleRight } from "react-icons/hi";
import { BsBarChartFill } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import style from './Sidebar.module.scss';



export default function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className={style.sidebarClosed}>
        <div className={style.boxIcon}>
          <HiChevronDoubleRight onClick={handleShow} className={style.iconStyle} data-testid="sidebar"/>
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

        
        <a  href='/logout' className={style.sair}>
          Sair
          <RiLogoutCircleRLine className={style.iconSair}/>
        </a>
      </div>

      <Offcanvas show={show} onHide={handleClose} className={style.sidebarOpen}>
        <Offcanvas.Header className={style.iconStyle} closeButton>
        </Offcanvas.Header>
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

        <a  href='/logout' className={style.sair}>
          Sair
          <RiLogoutCircleRLine className={style.iconSair}/>
        </a>
      </Offcanvas>
    </>
  );
}