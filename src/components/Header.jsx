import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { RecipesContext } from '../contexts/RecipesContext';
import ProfilePic from '../images/profile-photo.svg';
import SearchPic from '../images/search.svg';
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
  const { onClickButtonSearch, handleClickSearch,
    handleChangeSearch } = useContext(RecipesContext);

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
      <div className="search">
        <label htmlFor="search-input">
          <input
            type="text"
            data-testid="search-input"
            placeholder="Pesquise uma receita"
            className="search-input"
            onChange={ handleChangeSearch }
          />
        </label>
        <div className="search-radios">
          <div className="search-radio-flex">
              <input
                value="ingredient"
                id="ingredientFilter"
                name="radio"
                type="radio"
                className="ing_search"
                data-testid="ingredient-search-radio"
                onClick={ handleClickSearch }
              />
              <label
                className="search-label-web" 
                htmlFor="ingredientFilter"
              >
                Ingrediente
              </label>
          </div>
          <div className="search-radio-flex">
              <input
                value="name"
                id="nameFilter"
                type="radio"
                name="radio"
                className="name_search"
                data-testid="name-search-radio"
                onClick={ handleClickSearch }
              />
              <label
                htmlFor="nameFilter"
                className="search-label-web"
              >
                Nome
              </label>
            </div>
            <div className="search-radio-flex">
              <input
                value="first-letter"
                id="firstLetter"
                type="radio"
                name="radio"
                data-testid="first-letter-search-radio"
                className="letter_search"
                onClick={ handleClickSearch }
              />
              <label
                htmlFor="firstLetter"
                className="search-label-web web-left"
              >
                Primeira Letra
              </label>
            </div>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ onClickButtonSearch }
          className="button_search"
        >
          Buscar
        </button>
      </div>
  );

  return (
    <div className="header">
    <div className="header-principal">
        <button
          type="button"
          onClick={ handleProfilePic }
          className="button-header"
        >
          <img data-testid="profile-top-btn" src={ ProfilePic } alt="Profile" />
        </button>
        <h1 data-testid="page-title" className="page-title">{handleTitle(pathname)}</h1>
        { !verifySearchIcon() && (
          <button
            type="button"
            onClick={ handleSearchPic }
            className="button-header"
          >
            <img data-testid="search-top-btn" src={ SearchPic } alt="Profile" />
          </button>)}
        </div>
      { isInputShowing && renderInputsSearch()}
    </div>
  );
}
