import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkDetailsRequest } from '../fetchApi/fetchApi';

export default function StartRecipeBtn(props) {
  const { state, isStarted, setStateGlobal } = useContext(RecipesContext);
  const { id } = useParams();
  const history = useHistory();

  const inProgressPage = async () => {
    const some = await drinkDetailsRequest(id);
    if (some) {
      history.push(`/bebidas/${id}/in-progress`);
    } else {
      history.push(`/comidas/${id}/in-progress`);
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
