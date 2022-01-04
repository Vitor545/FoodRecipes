import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Comidas from './components/Comidas';
import Bebidas from './components/Bebidas';
import ProviderGlobal from './contexts/ProviderGlobal';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Router>
          <ProviderGlobal>
            <Route exact path="/comidas" component={ Comidas } />
            <Route path="/bebidas" component={ Bebidas } />
          </ProviderGlobal>
        </Router>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
