import api from "./api";

export async function getClasses() {
  const response = await api.get('/turmas');
  const options = response.data.map(classSchool => {
    return {
      label: classSchool.semestre+classSchool.complemento,
      id: classSchool.id
    }
  });
  return options;
}

export async function getSubjects(id_class, setSubjects) {
  const response = await api.get(`/materias/turma/${id_class}`);
  return setSubjects(response.data);
}

export async function getStudents(id_subject, setStudents) {
  const response = await api.get(`/grupos/alunos/materia/${id_subject}`);
  return setStudents(response.data);
}

export async function getGroup(id_group, setGroup) {
  const response = await api.get(`/grupos/${id_group}`);
  console.log(response.data);
  return setGroup(response.data);
}