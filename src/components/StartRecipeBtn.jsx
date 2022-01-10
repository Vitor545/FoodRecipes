import React, { useContext } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';

export default function StartRecipeBtn(props) {
  const { state, isStarted, setStateGlobal } = useContext(RecipesContext);
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();

  const inProgressPage = async () => {
    if (pathname.includes('comidas')) {
      history.push(`/comidas/${id}/in-progress`);
    } else {
      history.push(`/bebidas/${id}/in-progress`);
    }
  };

  const { bugBtn } = props;

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-btn"
      onClick={ inProgressPage }
    >
      { bugBtn ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );
}
