import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkDetailsRequest } from '../fetchApi/fetchApi';
import DrinksRecommended from './DrinksRecommended';

export default function DrinkId() {
  const { state, drinkDetails, setStateGlobal } = useContext(RecipesContext);

  const { id } = useParams();

  const requestApi = async () => {
    const drinks = await drinkDetailsRequest(id);
    console.log(drinks);
    setStateGlobal({ ...state, drinkDetails: drinks });
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <div>
      { drinkDetails && drinkDetails.map((element) => (
        <div key={ element.idDrink }>
          <h3 data-testid="recipe-title">{element.strDrink}</h3>
          <h4 data-testid="recipe-category">{`Categoria: ${element.strCategory}`}</h4>
          <img
            src={ element.strDrinkThumb }
            alt={ `${element.strDrink}` }
            data-testid="recipe-photo"
          />
        </div>
      ))}
      <ul>
        {ingredients.map((ing, index) => (
          <li
            key={ ing }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ing}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">
        {element.strInstructions}
      </p>
      <div>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>
      <div className="recommended-recipes">
        <DrinksRecommended />
      </div>
    </div>
  );
}
