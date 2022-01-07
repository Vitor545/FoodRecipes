import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { foodDetailsRequest } from '../fetchApi/fetchApi';
import FoodsRecommended from './FoodsRecommended';
import { RecipesContext } from '../contexts/RecipesContext';

export default function FoodId() {
  // const { foodName } = useContext(RecipesContext);
  const { state, foodDetails, setStateGlobal } = useContext(RecipesContext);

  const { id } = useParams();

  const requestApi = async () => {
    const food = await foodDetailsRequest(id);
    setStateGlobal({ ...state, foodDetails: food });
  };

  const renderIngredients = () => {
    // Pegando todas as chaves de foodDetails que contenham Ingredient no nome
    const ingr = Object.keys(foodDetails[0])
      .filter((key) => key.includes('Ingredient'));
    // Fazendo um map pelas chaves e pegando os valores dessas chaves em foodDetails
    const values = ingr.map((ingredient) => foodDetails[0][ingredient])
      .filter((el) => el !== '');
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
      { foodDetails && foodDetails
        .map(({ idMeal, strMeal, strCategory, strMealThumb, strInstructions }) => (
          <div key={ idMeal } className="recipes-card">
            <h3 data-testid="recipe-title">{strMeal}</h3>
            <h4 data-testid="recipe-category">{`Categoria: ${strCategory}`}</h4>
            <img
              src={ strMealThumb }
              alt={ `${strMeal}` }
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
      <div className="recommended-recipes ">
        <FoodsRecommended />
      </div>
    </div>
  );
}
