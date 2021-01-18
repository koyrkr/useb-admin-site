import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ViewLogPage from './pages/ViewLogPage';
import SendNotificationPage from './pages/SendNotificationPage';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/view-log" component={ViewLogPage} />
        <Route
          exact
          path="/send-notification"
          component={SendNotificationPage}
        />
        <Redirect from="/" to="/send-notification" />
      </Switch>
    </Router>
  );
};

export default App;
