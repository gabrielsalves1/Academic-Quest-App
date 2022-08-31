import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Offcanvas, Dropdown } from 'react-bootstrap';
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import style from './NavigationBar.module.scss';

import { Context } from "../../Context/AuthContext";
import LinkButton from "../LinkButton";
import { useEffect } from "react";

export default function NavigationBar() {
  const { handleLogout } = useContext(Context);
  const [role, setRole] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setRole(sessionStorage.getItem('role'));
  }, [])

  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" className={style.nav}>
      <Container fluid>
        <div className={style.alignLogo}>
          <AiOutlineMenu onClick={handleShow} className={style.icon} data-testid="sidebar"/>

          <Offcanvas show={show} onHide={handleClose} className={style.sidebar}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className={style.navItem}>
                <Link to="/projects" className={style.navItem}>Academic Quest</Link>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={style.navLinks}>
              
              { role === "PROFESSOR" ? (
                <>
                  <LinkButton to="/projects">Projetos</LinkButton><br/>
                  <LinkButton to="/groups">Grupos</LinkButton><br/>
                  <LinkButton to="/dashboard">Dashboard</LinkButton>
                </>
              ) : (
                <>
                  <LinkButton to="/projects">Projetos</LinkButton><br/>
                </>
              )}
              
            </Offcanvas.Body>
          </Offcanvas>

          <Link to="/" className={style.navItem}>
            <h1 className={style.title}>Academic Quest</h1>
          </Link>
        </div>
        
        
        {sessionStorage.getItem('userFirstName') != null &&
        <Dropdown>
          <Dropdown.Toggle className={style.dropdown}>
            <span className={style.username}>{sessionStorage.getItem('userFirstName')}</span>
            <BsFillPersonFill className={style.icon}/>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout} className={style.navItemDropdown} active>
              Sair
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        }
      </Container>
    </Navbar>
  );
}