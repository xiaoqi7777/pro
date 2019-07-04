import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Counter from './routes/Counter';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/counter" exact component={Counter} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
