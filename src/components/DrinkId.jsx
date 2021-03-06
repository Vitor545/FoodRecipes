import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkDetailsRequest, urlNames } from '../fetchApi/fetchApi';
import DrinksRecommended from './DrinksRecommended';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';
import Footer from '../components/Footer';
import StartRecipeBtn from './StartRecipeBtn';

export default function DrinkId({ history }) {
  const { state, drinkDetails, setStateGlobal } = useContext(RecipesContext);

  const { id } = useParams();

  const requestApi = async () => {
    const drinkRecommended = await urlNames('');
    const drink = await drinkDetailsRequest(id);
    // const recomendedFoods = await foodRecipesAPI();
    setStateGlobal({ ...state, drinkRecom: drinkRecommended, drinkDetails: drink });
  };

  const renderIngredients = () => {
    // Pegando todas as chaves de drinkDetails que contenham Ingredient no nome
    const ingr = Object.keys(drinkDetails[0])
      .filter((key) => key.includes('Ingredient'));
    const measure = Object.keys(drinkDetails[0])
      .filter((key) => key.includes('Measure'));
    // Fazendo um map pelas chaves e pegando os valores dessas chaves em drinkDetails
    const values = ingr.map((ingredient) => drinkDetails[0][ingredient])
      .filter((el) => el !== null);
    const valuesMeasure = measure.map((qty) => drinkDetails[0][qty])
      .map((el) => (el === null ? '' : el));

    return (
      values.map((ing, i) => (
        <li
          key={ ing }
          data-testid={ `${i}-ingredient-name-and-measure` }
          className="finish-label-container"
        >
          {valuesMeasure[i] === ''
            ? `${ing} ${valuesMeasure[i]}` : `${ing} - ${valuesMeasure[i]}`}
        </li>
      ))
    );
  };

  // useEffect(() => {
  //   let infoFromLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   if (!infoFromLocal) {
  //     infoFromLocal = {
  //       cocktails: {},
  //       meals: {},
  //     };
  //   }
  //   const isSaved = Object.keys(infoFromLocal.meals).includes(id)
  //     || Object.keys(infoFromLocal.cocktails).includes(id);
  //   if (isSaved) {
  //     setStateGlobal({ ...state, isStarted: true });
  //   } else {
  //     setStateGlobal({ ...state, isStarted: false });
  //   }
  // }, []);

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <div className="body-finish">
      { drinkDetails
      && drinkDetails.map((
        { idDrink, strDrink, strDrinkThumb, strInstructions, strAlcoholic },
      ) => (
        // Problema com key ??nica
        <div key={ idDrink } className="recipes-card flex-finish">
          <h3 data-testid="recipe-title">{strDrink}</h3>
          <h4 data-testid="recipe-category">{`Categoria: ${strAlcoholic}`}</h4>
          <img
            src={ strDrinkThumb }
            alt={ `${strDrink}` }
            data-testid="recipe-photo"
          />
          <ul className='ingredients-container'>
            {renderIngredients()}
          </ul>
          <p className='instructions' data-testid="instructions">
            {strInstructions}
          </p>
          <div className='b-finish'>
            <FavoriteBtn currentRecipe={ drinkDetails } />
            <ShareBtn />
          </div>
          <div className="recommended-recipes">
            <DrinksRecommended />
          </div>
          <StartRecipeBtn history={ history } />
        </div>
      ))}
        <Footer />
    </div>
  );
}

DrinkId.propTypes = {
  history: PropTypes.string.isRequired,
};
