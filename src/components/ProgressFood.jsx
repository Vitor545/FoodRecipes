import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { foodDetailsRequest } from '../fetchApi/fetchApi';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';
import FinishRecipeBtn from './FinishRecipeBtn';

export default function ProgressFood() {
  const [currentFood, setCurrentFood] = useState([]);
  const { id } = useParams();
  let infoFromLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!infoFromLocal) {
    infoFromLocal = {
      cocktails: {},
      meals: {},
    };
  }

  const renderProgressFood = () => {
    // Pegando todas as chaves de foodDetails que contenham Ingredient no nome
    const ingr = Object.keys(currentFood[0])
      .filter((key) => key.includes('Ingredient'));
    const measure = Object.keys(currentFood[0])
      .filter((key) => key.includes('Measure'));
    // Fazendo um map pelas chaves e pegando os valores dessas chaves em currentRecipe
    const values = ingr.map((ingredient) => currentFood[0][ingredient])
      .filter((el) => el !== '' && el !== null);
    const valuesMeasure = measure.map((qty) => currentFood[0][qty])
      .filter((el) => el !== '' && el !== null);
    return (
      values.map((ing, i) => (
        <li
          key={ i }
          data-testid={ `${i}-ingredient-step` }
        >
          {`${ing} - ${valuesMeasure[i]}`}
        </li>
      ))
    );
  };

  const gettingFood = async () => {
    const fillFood = await foodDetailsRequest(id);
    setCurrentFood(fillFood);
    const ingr = Object.keys(fillFood[0])
      .filter((key) => key.includes('Ingredient'));
    const values = ingr.map((ingredient) => fillFood[0][ingredient])
      .filter((el) => el !== '' && el !== null);
    console.log(values);
    infoFromLocal.meals = { ...infoFromLocal.meals, [id]: values };
    localStorage.setItem('inProgressRecipes', JSON.stringify(infoFromLocal));
  };

  useEffect(() => {
    gettingFood();
  }, []);

  return (
    <div>
      { console.log(currentFood) }
      { currentFood
      && currentFood.map((
        { idMeal, strMeal, strCategory, strMealThumb, strInstructions, strYoutube },
      ) => (
        <div key={ idMeal } className="recipes-card">
          <h3 data-testid="recipe-title">{strMeal}</h3>
          <h4 data-testid="recipe-category">{`Categoria: ${strCategory}`}</h4>
          <img
            src={ strMealThumb }
            alt={ `${strMeal}` }
            data-testid="recipe-photo"
          />
          <ul>
            {renderProgressFood()}
          </ul>
          <p data-testid="instructions">
            {strInstructions}
          </p>
          <div>
            <ShareBtn />
            <FavoriteBtn currentRecipe={ currentFood } />
          </div>
        </div>
      ))}
      <FinishRecipeBtn />
    </div>
  );
}
