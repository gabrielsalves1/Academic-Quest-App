import React from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import Routes from './service/routes';
import history from './service/history';
import { AuthProvider } from './Context/AuthContext';
import Base from './components/Base';
import Content from './components/Content';

function App() {
  return (
    <AuthProvider>
      <HistoryRouter location={history.location} history={history}>
          <Base>
            <Content>

              <Routes/>

            </Content>
          </Base>
      </HistoryRouter>
    </AuthProvider>
  );
}

export default App;
