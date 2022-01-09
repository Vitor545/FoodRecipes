import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteBtn(props) {
  const { state, drinkDetails, foodDetails, setStateGlobal } = useContext(RecipesContext);
  const [isClicked, setState] = useState({ isFavorited: false });
  // const { idDrink, strArea, strCategory,
  //   strAlcoholic, strDrink, strDrinkThumb } = drinkDetails[0];
  const gettingFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { id } = useParams();

  const { isFavorited } = isClicked;

  const alreadyFavorite = () => {
    const bool = gettingFavorites.some((obj) => obj.id === id);
    return bool;
  };

  const addToFavorites = () => {
    const { currentRecipe } = props;
    if (alreadyFavorite()) {
      return null;
    }
    const objToLocal = {
      id: currentRecipe[0].idDrink || currentRecipe[0].idMeal,
      type: currentRecipe[0].idDrink ? 'bebida' : 'comida',
      area: currentRecipe[0].strArea,
      category: currentRecipe[0].strCategory,
      alcoholicOrNot: currentRecipe[0].idDrink ? currentRecipe[0].strAlcoholic : '',
      name: currentRecipe[0].strDrink || currentRecipe[0].strMeal,
      image: currentRecipe[0].strDrinkThumb || currentRecipe[0].strMealThumb,
    };
    localStorage.setItem('favoriteRecipes', objToLocal);
  };

  const handleFavoriteIcon = () => {
    if (!isFavorited) {
      setState({ ...isClicked, isFavorited: true });
      addToFavorites();
    } else {
      setState({ ...isClicked, isFavorited: false });
      // const filteredFavorites = gettingFavorites.filter((obj) => obj.id !== id);
      // localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavorites));
    }
    // const objToLocal = {
    //   id: idDrink,
    //   type: 'bebida',
    //   area: strArea,
    //   category: strCategory,
    //   alcoholicOrNot: strAlcoholic,
    //   name: strDrink,
    //   image: strDrinkThumb,
    // };
    // if (gettingFavorites) {
    //   if (alreadyFavorite()) {
    //     return null;
    //   }
    //   localStorage.setItem('favoriteRecipes',
    //     JSON.stringify([...gettingFavorites, objToLocal]));
    //   console.log('já tem algo');
    // } else {
    //   const arr = [objToLocal];
    //   localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
    //   console.log('não tem nada');
    // }
  };
  // const isMealOrDrink = async () => {
  //   const trial = await foodDetailsRequest(id);
  //   return trial;
  // };

  useEffect(() => {
    if (alreadyFavorite()) {
      setState({ ...isClicked, isFavorited: true });
    } else {
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
        data-testid="favorite-btn"
        className="favorite-icon"
        src={ isFavorited ? blackFavoriteIcon : whiteFavoriteIcon }
        alt="favorite icon"
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  currentRecipe: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
