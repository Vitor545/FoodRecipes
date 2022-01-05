import React, { useEffect, useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';
import { foodRecipesAPI } from '../fetchApi/fetchApi';

function FoodCard() {
  const { state,
    setStateGlobal,
    foodRecipes,
    drinkRecipesBTN } = useContext(RecipesContext);

  const AMOUNT_NUMBER = 12;
  const AMOUNT_NUMBER_BTN = 5;

  const requestAPIBTN = async () => {
    const btn = await foodRecipesAPI();
    console.log(btn);
    const btnFiltered = btn.filter((el, index) => {
      if (index < AMOUNT_NUMBER_BTN) {
        return el;
      }
      return null;
    });
    setStateGlobal({ ...state, drinkRecipesBTN: btnFiltered });
  };

  const requestAPI = async () => {
    const food = await foodRecipesAPI();
    const foodFiltered = food.filter((el, index) => {
      if (index < AMOUNT_NUMBER) {
        return el;
      }
      return null;
    });
    setStateGlobal({ ...state, foodRecipes: foodFiltered });
  };

  useEffect(() => {
    requestAPI();
    requestAPIBTN();
  }, []);

  return (
    <div>
      {drinkRecipesBTN && drinkRecipesBTN.map((el) => ((<button
        key={ el.idMeal }
        type="button"
        data-testid={ `${el.strMeal}-category-filter` }
      >
        {el.strMeal}
        {' '}
                                                        </button>)))}

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
        </div>)
      ))}
    </div>
  );
}

export default FoodCard;
