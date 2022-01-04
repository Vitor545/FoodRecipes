import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import BarraBusca from './components/BarraBusca';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Router>
          <Route path="/:tipo" component={ BarraBusca } />
        </Router>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
