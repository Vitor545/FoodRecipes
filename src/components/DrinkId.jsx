import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkDetailsRequest } from '../fetchApi/fetchApi';
import DrinksRecommended from './DrinksRecommended';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';
import StartRecipeBtn from './StartRecipeBtn';

export default function DrinkId() {
  const { state, drinkDetails, setStateGlobal } = useContext(RecipesContext);

  const { id } = useParams();

  const requestApi = async () => {
    const drink = await drinkDetailsRequest(id);
    // const recomendedFoods = await foodRecipesAPI();
    setStateGlobal({ ...state, drinkDetails: drink });
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
        >
          {valuesMeasure[i] === ''
            ? `${ing} ${valuesMeasure[i]}` : `${ing} - ${valuesMeasure[i]}`}
        </li>
      ))
    );
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <div>
      { drinkDetails
      && drinkDetails.map((
        { idDrink, strDrink, strCategory, strDrinkThumb, strInstructions, strAlcoholic },
      ) => (
        <div key={ idDrink } className="recipes-card">
          <h3 data-testid="recipe-title">{strDrink}</h3>
          <h4 data-testid="recipe-category">{`Categoria: ${strCategory}`}</h4>
          <h4 data-testid="recipe-alcohol">{strAlcoholic}</h4>
          <img
            src={ strDrinkThumb }
            alt={ `${strDrink}` }
            data-testid="recipe-photo"
          />
          <ul>
            {renderIngredients()}
          </ul>
          <p data-testid="instructions">
            {strInstructions}
          </p>
          <div>
            <FavoriteBtn />
            <ShareBtn />
            <StartRecipeBtn />
          </div>
          <div className="recommended-recipes">
            <DrinksRecommended />
          </div>
        </div>
      ))}
    </div>
  );
}
