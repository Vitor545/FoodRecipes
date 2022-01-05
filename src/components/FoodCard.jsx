import React, { useEffect, useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';
import { foodRecipesAPI } from '../fetchApi/fetchApi';

function FoodCard() {

  const { state, setStateGlobal, foodRecipes } = useContext(RecipesContext);

  const AMOUNT_NUMBER = 12;

  const requestAPI = async () => {
    const food = await foodRecipesAPI();
    console.log(food);
    const foodFiltered = food.filter((el, index) => {
      if (index < AMOUNT_NUMBER) {
        return el;
      }
      return null;
    });
    console.log(foodFiltered);
    setStateGlobal({ ...state, foodRecipes: foodFiltered });
  };

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div>
      {foodRecipes && foodRecipes.map((el, index) => ((
        <div
          key={ el.idMeal }
        >
          <img
            src={ el.strMealThumb }
            alt=""
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>
            {el.strMeal}

          </h3>
          <p
            data-testid={ `${index}-recipe-card` }
          >
            {el.strSource}

          </p>
        </div>)
      ))}
    </div>
  );
}

export default FoodCard;
