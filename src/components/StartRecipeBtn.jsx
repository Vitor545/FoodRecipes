import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const locationName = document.location.pathname;

export default function StartRecipeBtn({ history }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [bugButton, setBugButton] = useState(false);

  const inProgressPage = async () => {
    if (pathname.includes('comidas')) {
      history.push(`/comidas/${id}/in-progress`);
    } else {
      history.push(`/bebidas/${id}/in-progress`);
    }
  };

  useEffect(() => {
    let infoFromLocal = localStorage.getItem('inProgressRecipes');
    if (infoFromLocal) {
      infoFromLocal = JSON.parse(infoFromLocal);
      const isSaved = (locationName.includes('/comidas')
      && Object.keys(infoFromLocal.meals).includes(id))
      || (locationName.includes('/bebidas')
      && Object.keys(infoFromLocal.cocktails).includes(id));
      console.log(infoFromLocal);
      if (isSaved) {
        setBugButton(true);
        console.log('teste');
        // setStateGlobal({ ...state, isStarted: true });
      } else {
        setBugButton(false);
        // setStateGlobal({ ...state, isStarted: false });
      }
    }
  }, []);

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-btn"
      onClick={ inProgressPage }
    >
      { bugButton ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );
}

StartRecipeBtn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
