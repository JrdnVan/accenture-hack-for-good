import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Lookup from './pages/Lookup/Lookup';
import Predictor from './pages/Predictor/Predictor';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#009ba6',
    },
    secondary: {
      main: '#da291c',
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  );
}

export default App;
