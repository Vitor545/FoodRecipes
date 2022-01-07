import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkDetailsRequest } from '../fetchApi/fetchApi';
import DrinksRecommended from './DrinksRecommended';

export default function DrinkId() {
  const { state, drinkDetails, setStateGlobal } = useContext(RecipesContext);

  const { id } = useParams();

  const requestApi = async () => {
    const drink = await drinkDetailsRequest(id);
    setStateGlobal({ ...state, drinkDetails: drink });
  };

  const renderIngredients = () => {
    // Pegando todas as chaves de drinkDetails que contenham Ingredient no nome
    const ingr = Object.keys(drinkDetails[0])
      .filter((key) => key.includes('Ingredient'));
    // Fazendo um map pelas chaves e pegando os valores dessas chaves em drinkDetails
    const values = ingr.map((ingredient) => drinkDetails[0][ingredient])
      .filter((el) => el !== null);
    return (
      values.map((ing, i) => (
        <li
          key={ ing }
          data-testid={ `${i}-ingredient-name-and-measure` }
        >
          {ing}
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
        { idDrink, strDrink, strCategory, strDrinkThumb, strInstructions, strVideo },
      ) => (
        <div key={ idDrink }>
          <h3 data-testid="recipe-title">{strDrink}</h3>
          <h4 data-testid="recipe-category">{`Categoria: ${strCategory}`}</h4>
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
        </div>
      ))}
      <div>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>
      <div className="recommended-recipes ">
        <DrinksRecommended />
      </div>
    </div>
  );
}
