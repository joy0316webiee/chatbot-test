import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Login from 'pages/Login';
import Chat from 'pages/Chat';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route exact path="/login" component={Login} />
      <Route exact path="/chat" component={Chat} />
    </Switch>
  </BrowserRouter>
)

export default Router;