import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { BsFillEyeFill } from "react-icons/bs";
import style from "./TableTask.module.scss";

export default function TableTask() {
  return (
    <>
      <h2 className={style.titleSecundary}>Entregues</h2>

      <Table data-testid="tableTask" className={style.table}>
        <thead className={style.header}>
          <tr>
            <th>Grupo</th>
            <th>Status</th>
            <th>Nota</th>
            <th>Data de Entrega</th>
            <th>Abrir</th>
          </tr>
        </thead>
        <tbody>
          <tr className={style.line}>
            <td>Fumacas</td>
            <td>Avaliado</td>
            <td>0</td>
            <td>01/01/2023</td>
            <td>
              <Link to="/view-task">
                <BsFillEyeFill className={style.icon}/>
              </Link>
            </td>
          </tr>
          <tr className={style.line}>
            <td>XD</td>
            <td>Avaliado</td>
            <td>0</td>
            <td>01/01/2023</td>
            <td>
              <Link to="/view-task">
                <BsFillEyeFill className={style.icon}/>
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}