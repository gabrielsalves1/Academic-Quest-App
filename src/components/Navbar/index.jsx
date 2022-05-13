import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Offcanvas } from 'react-bootstrap';
import { BsChevronDoubleRight } from "react-icons/bs";
import iconUser from '../../assets/img/icone-user.png';
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
            <Offcanvas.Title className={style.navItem}><Link to="/" className={style.navItem}>Academic Quest</Link></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className={style.navLinks}>
            <LinkButton to="/">Projetos</LinkButton><br/>
            <LinkButton to="/groups">Grupos</LinkButton>
          </Offcanvas.Body>
        </Offcanvas>
        
        <Link to="/" className={style.navItem}>
          <h1 className={style.title}>Academic Quest</h1>
        </Link>
        
        <Link to="/" className={style.navItem}>
          Leon
          <img src={iconUser} className={style.iconUser} alt="Icone do usuário"/>
        </Link>
      </Container>
    </Navbar>
  );
}