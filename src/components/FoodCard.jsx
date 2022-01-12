import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { fetchFoodCategory,
  fetchFoodIngredients,
  foodRecipesAPI,
  foodRecipesCategoryAPI } from '../fetchApi/fetchApi';

function FoodCard() {
  const { state,
    setStateGlobal,
    saveFoodRecipes,
    toggleFood,
    foodRecipes,
    foodPrincipal,
    foodIngredient,
    foodIngredientLink,
    foodRecipesBTN } = useContext(RecipesContext);

  const AMOUNT_NUMBER = 12;
  const AMOUNT_NUMBER_BTN = 5;

  const requestAPIIngredients = async () => {
    const recipesByIngredients = await fetchFoodIngredients(foodIngredientLink);
    console.log(recipesByIngredients);
    const btn = await foodRecipesCategoryAPI();
    const btnFiltered = btn.filter((ele, index) => {
      if (index < AMOUNT_NUMBER_BTN) {
        return ele;
      }
      return null;
    });
    setStateGlobal({ ...state,
      foodRecipes: recipesByIngredients,
      foodRecipesBTN: btnFiltered });
  };

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
      saveFoodRecipes: foodFiltered,
      foodRecipesBTN: btnFiltered });
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
    if (foodIngredient) requestAPIIngredients();
    if (foodPrincipal) requestAPI();
  }, []);

  return (
    <div className="card-container">
      <div className="card-btns">
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
      </div>
      {foodRecipes && foodRecipes.map((el, index) => ((
        <Link
          key={ el.idMeal }
          to={ `/comidas/${el.idMeal}` }
        >
          <div
            data-testid={ `${index}-recipe-card` }
            className="card"
          >
            <img
              src={ el.strMealThumb }
              alt=""
              data-testid={ `${index}-card-img` }
            />
            <h3 data-testid={ `${index}-card-name` }>
              {el.strMeal}
            </h3>
          </div>
        </Link>)
      ))}
    </div>
  );
}

export default FoodCard;
