import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { RecipesContext } from '../contexts/RecipesContext';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';
import builtObj from '../services/buildObjtoLocal';
import favoriteRecipes from '../services/localStorage';

export default function FavoriteBtn(props) {
  // const { state, drinkDetails, foodDetails, setStateGlobal } = useContext(RecipesContext);
  const [isClicked, setState] = useState({ isFavorited: false });
  const gettingFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { id } = useParams();

  const { isFavorited } = isClicked;

  const alreadyFavorite = () => {
    if (gettingFavorites) {
      const bool = gettingFavorites.some((obj) => obj.id === id);
      return bool;
    }
    return false;
  };

  const addToFavorites = () => {
    const { currentRecipe } = props;
    if (alreadyFavorite()) {
      return null;
    }
    gettingFavorites.push(builtObj(currentRecipe));
    localStorage.setItem('favoriteRecipes', JSON.stringify(gettingFavorites));
  };

  const handleFavoriteIcon = () => {
    if (!isFavorited) {
      setState({ ...isClicked, isFavorited: true });
      addToFavorites();
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
        // data-testid="favorite-btn"
        className="favorite-icon"
        src={ isFavorited ? blackFavoriteIcon : whiteFavoriteIcon }
        alt="favorite icon"
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  currentRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
};
