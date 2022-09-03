import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HiChevronDoubleRight } from "react-icons/hi";
import { BsFillGridFill } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
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
        
          <a href='/dashboard' className={style.littleBoxMenu}>
            <BsFillGridFill className={style.iconMenuGrid} />
          </a>
          <a  href='/projects' className={style.littleBoxMenu}>
            <FaFolder className={style.iconMenuFolder} />
          </a>
          <a  href='/groups' className={style.littleBoxMenu}>
            <HiUserGroup className={style.iconMenuGroup} />
          </a>
        </div>
        
      </div>

      <Offcanvas show={show} onHide={handleClose} className={style.sidebarOpen}>
        <Offcanvas.Header className={style.iconStyle} closeButton>
        </Offcanvas.Header>
        <div className={style.containerLittleBoxMenu}>
        
          <a href='/dashboard' className={style.boxMenu}>
            <BsFillGridFill className={style.iconMenuGrid} />
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
      </Offcanvas>
    </>
  );
}