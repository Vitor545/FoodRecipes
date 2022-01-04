import React, { useContext } from 'react';
import Provider from '../contexts/Provider';

function BarraBusca() {
  const { onClickButton, handleClick, handleChange,
    onClickButtonTeste } = useContext(Provider);
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        id="barra-pesquisa"
        data-testid="search-input"
        onChange={ handleChange }
      />
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          name="select"
          id="ingredient"
          value="ingredient"
          onClick={ handleClick }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          type="radio"
          name="select"
          onClick={ handleClick }
          id="name"
          value="name"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          type="radio"
          name="select"
          value="first-letter"
          onClick={ handleClick }
          id="first-letter"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ onClickButton }
      >
        Busca
      </button>
      <button
        type="button"
        onClick={ onClickButtonTeste }
      >
        Teste
      </button>
    </div>
  );
}

export default BarraBusca;
