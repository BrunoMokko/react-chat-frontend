import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import './styles/index.scss';
import App from './App';
import { userActions } from "redux/actions";
import store from 'redux/store';

store.dispatch(userActions.fetchUserData());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <React.StrictMode>
          <BrowserRouter>
              <Provider store={store}>
                  <App/>
              </Provider>
          </BrowserRouter>
      </React.StrictMode>

);



