import React from 'react';
import './styles/main.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import { Switch } from 'react-router';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <Switch>

      <PublicRoute exact path='/signin'>
        <SignIn />
      </PublicRoute>

      <PrivateRoute path='/'>
        <Home />
      </PrivateRoute>

    </Switch>
  );
}

export default App;
