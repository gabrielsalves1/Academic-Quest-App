import React from "react";
import { Table } from "react-bootstrap";
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
            <td>Icone</td>
          </tr>
          <tr className={style.line}>
            <td>XD</td>
            <td>Avaliado</td>
            <td>0</td>
            <td>01/01/2023</td>
            <td>Icone</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}