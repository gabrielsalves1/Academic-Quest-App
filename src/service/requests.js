import api from "./api";
import history from './history';

export async function getClasses() {
  const response = await api.get('/turmas');
  const options = response.data.map(classSchool => {
    return {
      label: classSchool.semestre + classSchool.complemento + " - " + classSchool.curso,
      id: classSchool.id
    }
  });
  return options;
}

export async function getData(url, setData, setLoading) {
  const response = await api.get(url);
  setLoading(true);
  return setData(response.data);
}

export function putData(data, url, redirect) {
  api.put(url, data, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => {
      if (res.status === 200) {
        history.push(redirect);
      }
    }).catch((err) => {
      console.log(err);
    });
}

export function postLogin(formData, handleLogin, setMsgError) {
  api.post('/oauth/token', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + window.btoa('academicquest:ricardosilvagostadexbox')
    }
  })
    .then((res) => {
      handleLogin(res);
    }).catch((err) => {
      setMsgError("E-mail ou senha inválido, verifique e tente novamente.");
    });
}

export function postGroup(data) {
  api.post('/grupos', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.status === 201) {
        history.push('/groups');
      }
    }).catch((err) => {
      console.log(err);
    });
}

export function postProject(data) {
  api.post('/projetos', data, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => {
      if (res.status === 201) {
        history.push('/projects');
      }
    }).catch((err) => {
      console.log(err);
    });
}

export function postQuest(formData, idProject, setUploadPercentage) {
  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);

      if (percent < 100) {
        setUploadPercentage(percent);
      }
    }
  }

  api.post('/tarefas', formData, options, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => {
      setUploadPercentage(100);

      if (res.status === 201) {
        history.push(`/project/${idProject}/quest-management`);
      }
    }).catch((err) => {
      console.log(err);
    });
}

export function postGroupGradeByProject(data, idProject) {
  api.post(`/projetos/avaliar/${idProject}`, data, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
}
