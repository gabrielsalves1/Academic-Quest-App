import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import style from "./ListGroups.module.scss";

import { getData } from "../../service/requests";
import StylizedLink from "../StylizedLink";

export default function ListGroups(props) {
  const [ loading, setLoading ] = useState();
  const [ groups, setGroups ] = useState();

  useEffect(() => {
    getData(`/grupos/materia/${props.subjectId}`, setGroups, setLoading);
  }, [props.subjectId]);

  return (
    <>
      { loading ? (
        <div className={style.listGroup}>
          <Table className={style.table} data-testid="tableGroups">
            <thead className={style.header}>
              <tr>
                <th>Grupos</th>
                <th>Visualizar Grupo</th>
              </tr>
            </thead>
            <tbody>
              { groups?.map((group) => (
                  <tr className={style.line} key={group.id}>
                    <td>{group.nome}</td>
                    <td>
                      <StylizedLink to={`/view-group/${group.id}/subject/${props.subjectId}`}>
                        Visualizar
                      </StylizedLink>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }

    { groups?.length === 0 &&
      <span className={style.withoutDataError}>Não há nenhum grupo cadastrado para a turma e matéria selecionada.</span>
    }
    </>
  );
}