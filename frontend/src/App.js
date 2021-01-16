import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Lookup from './pages/Lookup/Lookup';
import Predictor from './pages/Predictor/Predictor';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/predictor">
          <Predictor />
        </Route>
        <Route path="/lookup">
          <Lookup />
        </Route>
        <Route path="/">
          <Lookup />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
