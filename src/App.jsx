import React from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import style from './App.module.scss';

import Routes from './service/routes';
import history from './service/history';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <HistoryRouter location={history.location} history={history}>
        <div className={style.base}>
          <div className={style.content}>

            <Routes/>

          </div>
        </div>
      </HistoryRouter>
    </AuthProvider>
  );
}

export default App;
