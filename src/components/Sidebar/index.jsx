import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Image } from "react-bootstrap";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { BsBarChartFill } from "react-icons/bs";
import { FaFolder, FaTasks } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import style from './Sidebar.module.scss';


import { Context } from "../../Context/AuthContext";
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import iconLogo from '../../assets/img/icon-academic-quest.svg';
import { getData } from '../../service/requests';

export default function Sidebar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { handleLogout } = useContext(Context);
  const [ userFirstName, setUserFirstName] = useState(sessionStorage.getItem('userFirstName'));
  const [ userRole, setUserRole ] = useState(sessionStorage.getItem('role'));
  const [ idUser, setUserId ] = useState(sessionStorage.getItem('idUser'));
  const [ notifications, setNotifications ] = useState();
  const [ loading, setLoading ] = useState();

  useEffect(() => {
    getData(`/notificacoes/${idUser}`, setNotifications, setLoading);
  }, [idUser])

  return (
    <>
      <div className={style.sidebarClosed}>
        <div className={style.boxHeader}>
          <Link to='/sobre'>
            <Image fluid src={iconLogo} className={style.novoLogoStyle}/>
          </Link>

          <div className={style.boxIcon}>
            <HiChevronDoubleRight onClick={handleShow} className={style.iconStyle} data-testid="sidebar"/>
          </div>
        </div>

        <div className={style.boxName}>
          <p className={style.userFirstName}>{userFirstName}</p>
          <p className={style.userRole}>
            {userRole == "PROFESSOR" ? "Professor" : "Aluno"}
          </p>
          <SplitButton
            key="end"
            id={`dropdown-button-drop-end`}
            drop="end"
            title={<IoNotifications className={style.iconMenuHome}/>}
            className={style.littleBoxMenu}
            variant="none"
          >
            {(notifications?.length > 0 ) ? (
              notifications.map((notification) => {
                return (
                  <div className={style.boxNotifications}>
                    <Dropdown.Item eventKey={notification.id} className={style.notificationItem}>
                      {notification.mensagem}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                  </div>
                );
              })
            ) : (
              <div className={style.boxNotifications}>
                <Dropdown.Item className={style.notificationItem}>Não há notificações!</Dropdown.Item>
              </div>
            )}
          </SplitButton>
        </div>

        { userRole === "PROFESSOR" ? (
            <div className={style.containerLittleBoxMenu}>
              <Link to='/' className={style.littleBoxMenu}>
                <AiFillHome className={style.iconMenuHome} />
              </Link>
              <Link to='/dashboard' className={style.littleBoxMenu}>
                <BsBarChartFill className={style.iconMenuGrid} />
              </Link>
              <Link  to='/projects' className={style.littleBoxMenu}>
                <FaFolder className={style.iconMenuFolder} />
              </Link>
              <Link  to='/groups' className={style.littleBoxMenu}>
                <HiUserGroup className={style.iconMenuGroup} />
              </Link>
              <Link  to='/to-do-list' className={style.littleBoxMenu}>
                <FaTasks className={style.iconMenuTask} />
              </Link>
            </div>
          ) : (
            <div className={style.containerLittleBoxMenu}>
              <Link to='/' className={style.littleBoxMenu}>
                <AiFillHome className={style.iconMenuHome} />
              </Link>
              <Link  to='/projects' className={style.littleBoxMenu}>
                <FaFolder className={style.iconMenuFolder} />
              </Link>
              <Link to='/dashboard-aluno' className={style.littleBoxMenu}>
              <BsBarChartFill className={style.iconMenuGrid} />
              </Link>
            </div>
          )}
        <span onClick={handleLogout} className={style.sair}>
          Sair
          <MdLogout className={style.iconSair}/>
        </span>
      </div>

      <Offcanvas show={show} onHide={handleClose} className={style.sidebarOpen}>
        <div className={style.boxHeader}>
          <Link to='/sobre'>
            <Image fluid src={iconLogo} className={style.novoLogoStyle}/>
          </Link>
          <span className={style.academicQuest}>Academic <br/> Quest</span>
          <div>
            <HiChevronDoubleLeft onClick={handleClose} className={style.iconStyle} data-testid="sidebar"/>
          </div>
        </div>
        <hr />
        <div className={style.divCenter}>
          <div className={style.boxName}>
            <p className={style.userFirstName}>{userFirstName}</p>
            <p className={style.userRole}>
              {userRole == "PROFESSOR" ? "Professor" : "Aluno"}
            </p>
          </div>
        
          <div className={style.containerLittleBoxMenu}>
          { userRole === "PROFESSOR" ? (
            <>
              <Link to='/' className={style.boxMenu}>
                <AiFillHome className={style.iconMenuHome} />
                <span className={style.nameMenuHome}>Home</span>
              </Link>
              <Link to='/dashboard' className={style.boxMenu}>
                <BsBarChartFill className={style.iconMenuGrid} />
                <span className={style.nameMenuGrid}>Dashboard</span>
              </Link>
              <Link  to='/projects' className={style.boxMenu}>
                <FaFolder className={style.iconMenuFolder} />
                <span className={style.nameMenuFolder}>Projetos</span>
              </Link>
              <Link  to='/groups' className={style.boxMenu}>
                <HiUserGroup className={style.iconMenuGroup} />
                <span className={style.nameMenuGroup}>Grupos</span>
              </Link>
              <Link  to='/to-do-list' className={style.boxMenu}>
                <FaTasks className={style.iconMenuTask} />
                <span className={style.nameMenuTask}>Tarefas Entregues</span>
              </Link>
            </>
          ) : 
          (
            <>
              <Link  to='/projects' className={style.boxMenu}>
                <FaFolder className={style.iconMenuFolder} />
                <span className={style.nameMenuFolder}>Projetos</span>
              </Link>
              <Link to='/dashboard-aluno' className={style.boxMenu}>
                <FaTasks className={style.iconMenuTask} />
                <span className={style.nameMenuTask}>Tarefas pendentes</span>
              </Link>
            </>
          ) }
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