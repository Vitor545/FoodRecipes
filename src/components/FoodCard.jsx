import React, { useEffect, useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';
import { fetchFoodCategory,
  foodRecipesAPI,
  foodRecipesCategoryAPI } from '../fetchApi/fetchApi';

function FoodCard() {
  const { state,
    setStateGlobal,
    saveFoodRecipes,
    toggleFood,
    foodRecipes,
    foodRecipesBTN } = useContext(RecipesContext);

  const AMOUNT_NUMBER = 12;
  const AMOUNT_NUMBER_BTN = 5;

  const requestAPI = async () => {
    const food = await foodRecipesAPI();
    const foodFiltered = food.filter((el, index) => {
      if (index < AMOUNT_NUMBER) {
        return el;
      }
      return null;
    });

    const btn = await foodRecipesCategoryAPI();
    const btnFiltered = btn.filter((el, index) => {
      if (index < AMOUNT_NUMBER_BTN) {
        return el;
      }
      return null;
    });
    setStateGlobal({ ...state,
      foodRecipes: foodFiltered,
      foodRecipesBTN: btnFiltered,
      saveFoodRecipes: foodFiltered });
  };

  async function handleCategory({ target }) {
    const { id } = target;
    if (toggleFood === '') {
      const filterCategory = await fetchFoodCategory(id);

      const categoryFilter = filterCategory.filter((elem, index) => {
        if (index < AMOUNT_NUMBER) {
          return elem;
        }
        return null;
      });

      setStateGlobal({ ...state, foodRecipes: categoryFilter, toggleFood: id });
    } else if (toggleFood === id) {
      setStateGlobal({ ...state, toggleFood: '', foodRecipes: saveFoodRecipes });
    } else {
      const filterCategory = await fetchFoodCategory(id);

      const categoryFilter = filterCategory.filter((foods, index) => {
        if (index < AMOUNT_NUMBER) {
          return foods;
        }
        return null;
      });

      setStateGlobal({ ...state, foodRecipes: categoryFilter, toggleFood: id });
    }
  }

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div>
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => setStateGlobal({ ...state, foodRecipes: saveFoodRecipes }) }
      >
        All Recipes
      </button>
      {foodRecipesBTN && foodRecipesBTN.map((el) => ((
        <button
          key={ el.strCategory }
          type="button"
          data-testid={ `${el.strCategory}-category-filter` }
          onClick={ handleCategory }
          id={ el.strCategory }
        >
          {el.strCategory}
          {' '}
        </button>
      )))}

      {foodRecipes && foodRecipes.map((el, index) => ((
        <div
          key={ el.idMeal }
          data-testid={ `${index}-recipe-card` }
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
