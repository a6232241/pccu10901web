import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ROUTES from './routes';

export default function App() {
  return (
    <Router>
      <Switch>
        {ROUTES.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(routeProps) => (
              <route.component routes={route.routes} {...routeProps} />
            )}
          />
        ))}
      </Switch>
    </Router>
  );
}
