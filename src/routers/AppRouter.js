import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import TransactionDashboardPage from '../components/TransactionDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AddIncomePage from '../components/AddIncomePage';
import EditIncomePage from '../components/EditIncomePage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={TransactionDashboardPage} />
        <PrivateRoute path="/income/create" component={AddIncomePage} />
        <PrivateRoute path="/expense/create" component={AddExpensePage} />
        <PrivateRoute path="/expense/edit/:id" component={EditExpensePage} />
        <PrivateRoute path="/income/edit/:id" component={EditIncomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
