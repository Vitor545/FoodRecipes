import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';

export default function StartRecipeBtn() {
  const { state, isStarted, setStateGlobal } = useContext(RecipesContext);
  const { id } = useParams();

  const handleClick = () => {
    if (!isStarted) setStateGlobal({ ...state, isStarted: true });
    console.log(id);
  };

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-btn"
      onClick={ handleClick }
    >
      { isStarted ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );
}
