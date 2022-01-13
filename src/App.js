import React from 'react';
import './App.css';
import { useLocation } from 'react-router';
import Header from './components/Header';
import Routes from './components/Routes';

function App() {
  const { pathname } = useLocation();
  // Array de rotas que o header não deve aparecer
  const notShowingHeader = ['/', '/comidas/:id', '/bebidas/:id',
    '/comidas/:id'];
  // Regex para identificar se a rota contém pelo menos 1 dígito
  const getNumberRegex = /\d/;
  // Função que verifica se o pathname é o correto para o Header
  const verifyUrl = () => {
    if (notShowingHeader.some((url) => url === pathname)) {
      return true;
    }
    return getNumberRegex.test(pathname);
  };
  return (
    <div className="body">
      { !verifyUrl() && <Header /> }
      <Routes />
    </div>
  );
}

export default App;
