import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ProfilePic from '../images/profileIcon.svg';
import SearchPic from '../images/searchIcon.svg';

export default function Header() {
  const [isInputShowing, setSearchInput] = useState(false);
  // Pegando history através do hook useHistory()
  const history = useHistory();

  const handleProfilePic = () => {
    // Rota a ser redirecionada, mas falta o BrowserRouter
    history.push('/perfil');
  };
  // Função que faz os inputs de busca aparecerem
  const handleSearchPic = () => {
    if (isInputShowing) {
      setSearchInput(false);
    } else {
      setSearchInput(true);
    }
  };
  // Função que renderiza os inputs
  const renderInputsSearch = () => (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search Recipe"
        />
      </label>
      <div>
        <input
          type="radio"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
        <input
          type="radio"
          data-testid="name-search-radio"
        />
        Nome
        <input
          type="radio"
          data-testid="first-letter-search-radio"
        />
        Primeira Letra
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );

  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ handleProfilePic }
      >
        <img src={ ProfilePic } alt="Profile" />
      </button>
      <h1 data-testid="page-title">Receitas</h1>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ handleSearchPic }
      >
        <img src={ SearchPic } alt="Profile" />
      </button>
      { isInputShowing && renderInputsSearch()}
    </div>
  );
}
