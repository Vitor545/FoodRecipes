import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';
import builtObj from '../services/buildObjtoLocal';
import favoriteRecipes from '../services/localStorage';

const gettingFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

const addToFavorites = (alreadyFavorite, currentRecipe) => {
  if (alreadyFavorite()) {
    return null;
  }
  gettingFavorites.push(builtObj(currentRecipe));
  localStorage.setItem('favoriteRecipes', JSON.stringify(gettingFavorites));
};

export default function FavoriteBtn({ currentRecipe, dataTestId }) {
  const { handleUpdate } = useContext(RecipesContext);
  const [isClicked, setState] = useState({ isFavorited: false });
  let { id } = useParams();
  id = currentRecipe.id ? currentRecipe.id : id;
  const { isFavorited } = isClicked;
  const alreadyFavorite = () => {
    if (gettingFavorites) {
      const bool = gettingFavorites.some((obj) => obj.id === id);
      return bool;
    }
    return false;
  };
  const handleFavoriteIcon = () => {
    handleUpdate();
    if (!isFavorited) {
      setState({ ...isClicked, isFavorited: true });
      addToFavorites(alreadyFavorite, currentRecipe);
    } else {
      setState({ ...isClicked, isFavorited: false });
      const filteredFavorites = gettingFavorites.filter((obj) => obj.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavorites));
    }
  };
  useEffect(() => {
    if (gettingFavorites) {
      if (alreadyFavorite()) {
        setState({ ...isClicked, isFavorited: true });
      } else {
        setState({ ...isClicked, isFavorited: false });
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setState({ ...isClicked, isFavorited: false });
    }
  }, []);

  return (
    <button
      type="button"
      className="favorite-btn"
      onClick={ handleFavoriteIcon }
    >
      <img
        data-testid={ dataTestId || 'favorite-btn' }
        className="favorite-icon"
        src={ isFavorited ? blackFavoriteIcon : whiteFavoriteIcon }
        alt="favorite icon"
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  currentRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataTestId: PropTypes.string.isRequired,
};
