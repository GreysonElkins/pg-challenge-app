import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.scss';
import Routes from './views';
import { UserProvider, ApiProvider } from './context'

ReactDOM.render(
    <UserProvider>
      <ApiProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ApiProvider>
    </UserProvider>,
  document.getElementById('root')
)

