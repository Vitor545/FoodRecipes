import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';

export default function StartRecipeBtn() {
  const { state, isStarted, foodDetails, setStateGlobal } = useContext(RecipesContext);
  const { id } = useParams();
  let mealToLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!mealToLocal) {
    mealToLocal = {
      cocktails: {},
      meals: {},
    };
  }
  const ingr = Object.keys(foodDetails[0])
    .filter((key) => key.includes('Ingredient'));
  const values = ingr.map((ingredient) => foodDetails[0][ingredient])
    .filter((el) => el !== '');
  // const measure = Object.keys(foodDetails[0])
  //   .filter((key) => key.includes('Measure'));
  // const valuesMeasure = measure.map((qty) => foodDetails[0][qty])
  //   .filter((el) => el !== '');
  // const ingrList = values.map((ing, i) => (
  //   `${ing} - ${valuesMeasure[i]}`
  // ));
  // setStateGlobal({ ...state, foodIngrList: ingrList });

  const handleClick = () => {
    const inProgressRecipes = {
      cocktails: {},
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    mealToLocal.meals = { ...mealToLocal.meals, [id]: values };
    localStorage.setItem('inProgressRecipes', JSON.stringify(mealToLocal));
    if (!isStarted) setStateGlobal({ ...state, isStarted: true });
    console.log(mealToLocal);
  };

  useEffect(() => {
    const isSaved = Object.keys(mealToLocal.meals).includes(id);
    console.log(isSaved);
    if (isSaved) {
      setStateGlobal({ ...state, isStarted: true });
    } else {
      setStateGlobal({ ...state, isStarted: false });
    }
  }, []);

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-btn"
      onClick={ handleClick }
    >
      { isStarted ? 'Continue Recipe' : 'Start Recipe' }
    </button>
  );
}
