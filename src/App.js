import React from 'react';
import { Switch } from 'react-router';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

import 'rsuite/dist/styles/rsuite-default.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/myOwn.css';
import { ProfileProvider } from './context/Profile.context';

function App() {
  return (
    <>
      <ProfileProvider>
        <Switch>
          <PrivateRoute exact path="/" component={() => <Home />} />
          <PublicRoute exact path="/signin" component={() => <SignIn />} />
        </Switch>
      </ProfileProvider>
    </>
  );
}

export default App;
