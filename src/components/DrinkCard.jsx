import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkFilterCategory, drinkRecipesAPI,
  drinkRecipesCategoryAPI, fetchDrinkIngredients } from '../fetchApi/fetchApi';

function DrinkCard() {
  const { state, setStateGlobal,
    drinkRecipes, drinkRecipesBtns, saveDrinkRecipes,
    toggleDrink, drinkPrincipal,
    drinkIngredient,
    drinkIngredientLink } = useContext(RecipesContext);

  const AMOUNT_RECIPES_NUMBER = 12;
  const AMOUNT_CATEGORT_NUMBER = 5;

  const requestAPIIngredients = async () => {
    const drinks = await fetchDrinkIngredients(drinkIngredientLink);
    const drinksBtns = await drinkRecipesCategoryAPI();
    const categoryBtns = drinksBtns.filter((btn, index) => {
      if (index < AMOUNT_CATEGORT_NUMBER) {
        return btn;
      }
      return null;
    });
    const drinksFiltered = drinks.filter((el, index) => {
      if (index < AMOUNT_RECIPES_NUMBER) {
        return el;
      }
      return null;
    });
    setStateGlobal({ ...state,
      drinkRecipes: drinksFiltered,
      drinkRecipesBtns: categoryBtns,
      saveDrinkRecipes: drinksFiltered });
  };

  const requestAPI = async () => {
    const drinks = await drinkRecipesAPI();
    const drinksBtns = await drinkRecipesCategoryAPI();
    const categoryBtns = drinksBtns.filter((btn, index) => {
      if (index < AMOUNT_CATEGORT_NUMBER) return btn;
      return null;
    });
    const drinksFiltered = drinks.filter((el, index) => {
      if (index < AMOUNT_RECIPES_NUMBER) return el;
      return null;
    });
    setStateGlobal({ ...state,
      drinkRecipes: drinksFiltered,
      drinkRecipesBtns: categoryBtns,
      saveDrinkRecipes: drinksFiltered });
  };

  const handleAll = () => {
    setStateGlobal({ ...state, drinkRecipes: saveDrinkRecipes });
  };

  const handleCategory = async ({ target }) => {
    const { name } = target;
    if (toggleDrink === '') {
      const drinks = await drinkFilterCategory(name);
      const drinksFilter = drinks.filter((drink, index) => {
        if (index < AMOUNT_RECIPES_NUMBER) {
          return drink;
        }
        return null;
      });
      setStateGlobal({ ...state, drinkRecipes: drinksFilter, toggleDrink: name });
    } else if (toggleDrink === name) {
      setStateGlobal({ ...state, drinkRecipes: saveDrinkRecipes, toggleDrink: '' });
    } else {
      const drinks = await drinkFilterCategory(name);
      const drinksFilter = drinks.filter((dk, index) => {
        if (index < AMOUNT_RECIPES_NUMBER) {
          return dk;
        }
        return null;
      });
      setStateGlobal({ ...state, drinkRecipes: drinksFilter, toggleDrink: name });
    }
  };

  useEffect(() => {
    if (drinkPrincipal) requestAPI();
    if (drinkIngredient) requestAPIIngredients();
  }, []);

  return (
    <div className="card-container">
      <div className="card-btns">
        <button
          type="submit"
          data-testid="All-category-filter"
          onClick={ handleAll }
        >
          All
        </button>
        { drinkRecipesBtns && drinkRecipesBtns.map(({ strCategory }) => ((
          <button
            key={ strCategory }
            type="submit"
            name={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ handleCategory }
          >
            { strCategory }
          </button>
        )))}
      </div>
      <div className="card-container-conteuds">
        {drinkRecipes && drinkRecipes.map((el, index) => ((
          <Link
            data-testid={ `${index}-recipe-card` }
            className="card"
            to={ `/bebidas/${el.idDrink}` }
            key={ index }
          >
              <img
                src={ el.strDrinkThumb }
                alt=""
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>
                {el.strDrink}
              </h3>
          </Link>)
        ))}
      </div>
    </div>
  );
}

export default DrinkCard;
