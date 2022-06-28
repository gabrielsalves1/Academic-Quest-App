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

export async function getGroups(id_subject, setGroups) {
  const response = await api.get(`/grupos/materia/${id_subject}`);
  return setGroups(response.data);
}

export async function getProjects(id_subject, setProjects) {
  const response = await api.get(`/projetos/materia/${id_subject}`);
  return setProjects(response.data);
}

export async function getTasks(id_project, setQuests) {
  const response = await api.get(`/tarefas/projeto/${id_project}`);
  return setQuests(response.data);
}

export async function getTask(id_task, setTask) {
  const response = await api.get(`/tarefas/${id_task}`);
  return setTask(response.data);
}

export async function getTaskGroups(id_task, setTaskGroups) {
  const response = await api.get(`/tarefa/grupo/${id_task}`);
  return setTaskGroups(response.data);
}

export async function getTaskByGroup(id_group, setTask) {
  const response = await api.get(`/tarefa/grupo/id/${id_group}`);
  console.log(response.data);
  return setTask(response.data);
}