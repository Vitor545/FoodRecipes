import React, { useEffect, useContext } from 'react';
import Footer from './Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkFilterCategory,
  drinkRecipesAPI, drinkRecipesCategoryAPI } from '../fetchApi/fetchApi';

function DrinkCard() {
  const { state, setStateGlobal,
    drinkRecipes, drinkRecipesBtns, saveDrinkToggle,
    toggleDrink } = useContext(RecipesContext);

  const AMOUNT_RECIPES_NUMBER = 12;
  const AMOUNT_CATEGORT_NUMBER = 5;

  const requestAPI = async () => {
    const drinks = await drinkRecipesAPI();
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
      saveDrinkToggle: drinksFiltered });
  };

  const handleCategory = async ({ target }) => {
    const { name } = target;
    if (toggleDrink) {
      const drinks = await drinkFilterCategory(name);
      const drinksFilter = drinks.filter((drink, index) => {
        if (index < AMOUNT_RECIPES_NUMBER) {
          return drink;
        }
        return null;
      });
      setStateGlobal({ ...state, drinkRecipes: drinksFilter, toggleDrink: false });
    } else {
      setStateGlobal({ ...state, drinkRecipes: saveDrinkToggle, toggleDrink: true });
    }
  };

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div>
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
      {drinkRecipes && drinkRecipes.map((el, index) => ((
        <div
          key={ el.idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ el.strDrinkThumb }
            alt=""
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>
            {el.strDrink}
          </h3>
        </div>)
      ))}
      <Footer />
    </div>
  );
}

export default DrinkCard;
