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
  console.log(response.data);
  return setData(response.data);
}

export function postData(url, data, redirect) {
  api.post(url, data, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => {
      if (res.status === 201) {
        history.push(redirect);
      } else if(res.status === 200) {
        window.location.reload();
      }
    }).catch((err) => {
      console.log(err);
    });
}

export function postDataFile(url, formData, redirect, setUploadPercentage) {
  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);

      if (percent < 100) {
        setUploadPercentage(percent);
      }
    }
  }

  api.post(url, formData, options, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    setUploadPercentage(100);

    if (res.status === 201) {
      history.push(redirect);
    } else if(res.status === 200) {
      window.location.reload();
    }
  }).catch((err) => {
    console.log(err);
  });
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

export function postMessageChat(data, redirect) {

  api.post('/chats', data, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => {
      if (res.status === 201) {
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
