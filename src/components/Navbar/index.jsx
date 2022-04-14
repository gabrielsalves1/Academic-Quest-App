import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Offcanvas } from 'react-bootstrap';
import { BsChevronDoubleRight } from "react-icons/bs";
import iconeUser from '../../assets/img/icone-user.png';
import logo from '../../assets/img/logo-academic-quest.png';
import style from './NavigationBar.module.scss';

import LinkButton from "../LinkButton";

export default function NavigationBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar fixed="top" className={style.nav}>
      <Container fluid >
        <BsChevronDoubleRight onClick={handleShow} data-testid="sidebar"/>

        <Offcanvas show={show} onHide={handleClose} className={style.sidebar}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className={style.navItem}>Academic Quest</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <LinkButton url="/" className={style.navItem}>Projetos</LinkButton><br/>
            <LinkButton url="/" className={style.navItem}>Grupos</LinkButton>
          </Offcanvas.Body>
        </Offcanvas>
        
        <Link to="/" className={style.navItem}>
          <img src={logo} className={style.logo}/>
          <h1 className={style.title}>Academic Quest</h1>
        </Link>
        
        <Link to="/" className={style.navItem}>
          Leon
          <img src={iconeUser} className={style.iconeUser}/>
        </Link>
      </Container>
    </Navbar>
  );
}