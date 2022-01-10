import PropTypes from 'prop-types';
import React from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';

export default function StartRecipeBtn(props) {
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

StartRecipeBtn.propTypes = {
  bugBtn: PropTypes.bool.isRequired,
};
