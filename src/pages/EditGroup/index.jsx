import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { Form, Spinner } from "react-bootstrap";
import style from "./EditGroup.module.scss";

import { getData, putData } from "../../service/requests";
import Container from "../../components/Container";
import LinkButton from "../../components/LinkButton";
import StylizedButton from "../../components/StylizedButton";

export default function EditGroup() {
  const [ loading, setLoading ] = useState();
  const { idGroup, idSubject } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ group, setGroup ] = useState();
  const [ students, setStudents ] = useState();
  const [ selectMember, setSelectMember] = useState();
  const [ membersId, setMembersId ] = useState([]);
  const [ leadMember, setMemberLead ] = useState();

  const onSubmit = data => {
    data['listaAlunosId'] = membersId;
    data['alunoLiderId'] = leadMember;

    putData(data, `/grupos/${group.id}`, `/view-group/${group.id}/subject/${group.materiaId}`);
  }

  useEffect(() => {
    getData(`/grupos/${idGroup, idSubject}`, setGroup, setLoading);
    getData(`/grupos/alunos/materia/${idSubject}`, setStudents, setLoading);
  }, [idGroup, idSubject]);

  useEffect(() => {
    setMemberLead(group?.alunoLiderId);
    group?.listaAlunos.map((alunoId) => {
        setMembersId(membersId => [...membersId, alunoId.id]);
    });
  }, [group]);

  return (
    <Container classStyle="containerJustifyCenter">
      <h2 className={style.title}>Editar Grupo</h2>

      { loading ? (
        <Form className={style.form} onSubmit = { handleSubmit(onSubmit) }>
          { students &&
            <Form.Group>
              <Form.Label className={style.label} htmlFor="students">Integrantes</Form.Label>
              <div className={style.selectButtonAlign}>
                <Form.Select className={style.inputForm} onChange={(e) => {
                  setSelectMember(e.target.value);
                }}>
                  <option>Selecione o aluno</option>
                  {students?.map((student) => (
                    <option value={student.id} key={student.id}>{student.firstName} {student.lastName}</option>
                  ))}
                </Form.Select>
                  
                <StylizedButton type="button" onClick={() => {
                  if(!membersId.includes(selectMember)) {
                    setMembersId(membersId => [...membersId, selectMember]);
                  }
                }}>
                  Adicionar
                </StylizedButton>
              </div>
            </Form.Group>
          }

          { students?.length === 0 &&
            <p className={style.error}>Não há alunos sem grupo nessa matéria.</p>
          }

          { membersId?.length === 0 && students &&
            <p className={style.error}>Selecione os integrantes do grupo e defina o líder do grupo.</p>
          }

          { membersId &&
            membersId?.map((memberId) => (
              students?.map((student) => {
                if(student.id === parseInt(memberId)) {
                  return (
                    <div key={memberId} className={style.cardGroup}>
                      <div key={memberId} className={style.student}>
                        { leadMember === memberId && 
                          <p className={style.leadStudent}>Líder do Grupo <FaCrown className={style.icon}/></p>
                        }
                        <span>{student.firstName} {student.lastName}</span>
                      </div>
                      <StylizedButton type="button" onClick={() => {
                        setMemberLead(memberId);
                      }}>
                        Líder do Grupo
                      </StylizedButton>

                      <StylizedButton type="button" onClick={() => {
                        membersId.splice(membersId.indexOf(memberId), 1);
                        setMembersId(membersId => [...membersId]);
                      }}>
                        Remover
                      </StylizedButton>
                    </div>
                  );
                } else {
                  return undefined;
                }
              })
            ))
          }

          <Form.Group>
            <Form.Label className={style.label} htmlFor="name">Nome do Grupo</Form.Label>
            <Form.Control defaultValue={group?.nome} name="name" {...register("nome", { required: true })} className={style.inputForm}/>
            {errors.nome && <p className={style.error}>Este campo é obrigatório.</p>}
          </Form.Group>

          <div className={style.menuForm}>
            <LinkButton to={`/view-group/${idGroup}/subject/${idSubject}`}>Voltar</LinkButton>

            <StylizedButton type="submit">Salvar</StylizedButton>
          </div>
        </Form>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
    </Container>
  );
}