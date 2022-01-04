import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

function BarraBusca() {
  const { onClickButtonSearch, handleClickSearch,
    handleChangeSearch } = useContext(RecipesContext);
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        id="barra-pesquisa"
        data-testid="search-input"
        onChange={ handleChangeSearch }
      />
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          name="select"
          id="ingredient"
          value="ingredient"
          onClick={ handleClickSearch }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name" data-testid="name-search-radio">
        Nome
        <input
          type="radio"
          name="select"
          onClick={ handleClickSearch }
          id="name"
          value="name"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          type="radio"
          name="select"
          value="first-letter"
          onClick={ handleClickSearch }
          id="first-letter"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ onClickButtonSearch }
      >
        Busca
      </button>
    </div>
  );
}

export default BarraBusca;
