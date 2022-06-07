import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import AsyncSelect from 'react-select/async';
import style from "./CreateGroup.module.scss";

import api from "../../service/api";
import { getClasses, getSubjects, getStudents } from "../../service/requests";
import Container from "../../components/Container";
import LinkButton from "../../components/LinkButton";
import StylizedButton from "../../components/StylizedButton";
import ListSubject from "../../components/ListSubject";

export default function CreateGroup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ subjects, setSubjects ] = useState();
  const [ selectSubject, setSelectSubject ] = useState();
  const [ selectMember, setSelectMember] = useState();
  const [ students, setStudents ] = useState();
  const [ membersId, setMembersId ] = useState([]);

  const onSubmit = data => {
    data['alunosId'] = membersId;
    data['materiaId'] = selectSubject;
    data['alunoLiderId'] = 1;
    console.log(data);
    
    api.post('https://ms-academicquest.herokuapp.com/grupos', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    if(selectSubject !== undefined) {
      getStudents(selectSubject, setStudents);
      console.log(students);
    }
  }, [selectSubject])

  return (
    <Container>
      <h2 className={style.title}>Criar Grupo</h2>

      <Form className={style.form} onSubmit = { handleSubmit(onSubmit) }>
        <AsyncSelect 
          cacheOptions
          defaultOptions
          loadOptions={getClasses}
          onChange={(data) => {
            getSubjects(data.id, setSubjects);
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary: '#aea8ee',
              neutral20: '#c3cfd9',
            },
          })}
          className={style.selectForm}
          placeholder="Selecione a turma"/>

        { subjects && 
          <Form.Group>
            <Form.Label className={style.label} htmlFor="subject">Matéria</Form.Label>
            <ListSubject 
              subjects={subjects}
              setSelectSubject={setSelectSubject}/>
          </Form.Group> 
        }

        { students &&
          <Form.Group>
            <Form.Label className={style.label} htmlFor="students">Integrantes</Form.Label>
            <div className={style.selectButtonAlign}>
              <Form.Select className={style.inputForm} onChange={(e) => {
                setSelectMember(e.target.value);
                console.log("Select foi alterado para o membro ", selectMember);
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

        { membersId &&
          membersId?.map((memberId) => (
            students?.map((student) => {
              if(student.id == memberId) {
                return (
                <div key={memberId}>
                  <span>{student.firstName} {student.lastName}</span>
                </div>
                );
              }
            })
          ))
        }

        { students && 
          <Form.Group>
            <Form.Label className={style.label} htmlFor="name">Nome do Grupo</Form.Label>
            <Form.Control name="name" {...register("nome", { required: true })} className={style.inputForm}/>
            {errors.nome && <p className={style.error}>Este campo é obrigatório.</p>}
          </Form.Group> 
        }

        <div className={style.menuForm}>
          <LinkButton to="/groups">Voltar</LinkButton>

          <StylizedButton type="submit">Salvar</StylizedButton>
        </div>
      </Form>
    </Container>
  );
}