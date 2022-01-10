import PropTypes from 'prop-types';
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function StartRecipeBtn({ bugBtn, history }) {
  const { id } = useParams();
  const { pathname } = useLocation();

  const inProgressPage = async () => {
    if (pathname.includes('comidas')) {
      history.push(`/comidas/${id}/in-progress`);
    } else {
      history.push(`/bebidas/${id}/in-progress`);
    }
  };

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

StartRecipeBtn.propTypes = {
  bugBtn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
