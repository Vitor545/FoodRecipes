import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import ProfilePic from '../images/profileIcon.svg';
import SearchPic from '../images/searchIcon.svg';
import handleTitle from '../services/handleUrlPath';

export default function Header() {
  const [isInputShowing, setSearchInput] = useState(false);
  // Pegando history através do hook useHistory()
  const history = useHistory();
  const { pathname } = useLocation();
  // Array de pathnames que ícone não aparece
  const notShowIconImg = ['/explorar', '/explorar-comidas',
    '/explorar/comidas/ingredientes', '/receitas-feitas',
    '/perfil', '/receitas-favoritas', '/', '/explorar/comidas',
    '/explorar/bebidas', '/explorar/bebidas/ingredientes'];

  const verifySearchIcon = () => notShowIconImg.some((url) => url === pathname);

  const handleProfilePic = () => {
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
        <label htmlFor="ingredientFilter">
          <input
            id="ingredientFilter"
            type="radio"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="nameFilter">
          <input
            id="nameFilter"
            type="radio"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            id="firstLetter"
            type="radio"
            data-testid="first-letter-search-radio"
          />
          Primeira Letra
        </label>
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
        onClick={ handleProfilePic }
      >
        <img data-testid="profile-top-btn" src={ ProfilePic } alt="Profile" />
      </button>
      <h1 data-testid="page-title">{handleTitle(pathname)}</h1>
      { !verifySearchIcon() && (
        <button
          type="button"
          onClick={ handleSearchPic }
        >
          <img data-testid="search-top-btn" src={ SearchPic } alt="Profile" />
        </button>)}
      { isInputShowing && renderInputsSearch()}
    </div>
  );
}
