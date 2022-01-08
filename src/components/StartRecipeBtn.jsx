import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkDetailsRequest } from '../fetchApi/fetchApi';

export default function StartRecipeBtn() {
  const { state, isStarted, foodDetails,
    drinkDetails, setStateGlobal } = useContext(RecipesContext);
  const { id } = useParams();
  // const inProgressRecipes = {
  //   cocktails: {},
  //   meals: {},
  // };
  let infoFromLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!infoFromLocal) {
    infoFromLocal = {
      cocktails: {},
      meals: {},
    };
  }

  // const ingr = Object.keys(foodDetails[0])
  //   .filter((key) => key.includes('Ingredient'));
  // const values = ingr.map((ingredient) => foodDetails[0][ingredient])
  //   .filter((el) => el !== '');
  // const drinkIngr = Object.keys(drinkDetails[0])
  //   .filter((key) => key.includes('Ingredient'));
  // const drinkValues = ingr.map((ingredient) => drinkDetails[0][ingredient])
  //   .filter((el) => el !== null);
  // const valuesMeasure = drinkValues.map((qty) => drinkDetails[0][qty])
  //   .map((el) => (el === null ? '' : el));

  const teste = async () => {
    const some = await drinkDetailsRequest(id);
    return some;
  };

  const handleDrinkClick = () => {
    const drinkIngr = Object.keys(drinkDetails[0])
      .filter((key) => key.includes('Ingredient'));
    const drinkValues = drinkIngr.map((ingredient) => drinkDetails[0][ingredient])
      .filter((el) => el !== null);
    infoFromLocal.cocktails = { ...infoFromLocal.cocktails, [id]: drinkValues };
    localStorage.setItem('inProgressRecipes', JSON.stringify(infoFromLocal));
    if (!isStarted) setStateGlobal({ ...state, isStarted: true });
    // console.log(infoFromLocal);
  };

  const handleFoodClick = () => {
    const ingr = Object.keys(foodDetails[0])
      .filter((key) => key.includes('Ingredient'));
    const values = ingr.map((ingredient) => foodDetails[0][ingredient])
      .filter((el) => el !== '');
    infoFromLocal.meals = { ...infoFromLocal.meals, [id]: values };
    localStorage.setItem('inProgressRecipes', JSON.stringify(infoFromLocal));
    if (!isStarted) setStateGlobal({ ...state, isStarted: true });
  };

  useEffect(() => {
    const isSaved = Object.keys(infoFromLocal.meals).includes(id)
      || Object.keys(infoFromLocal.cocktails).includes(id);
    console.log(isSaved);
    if (isSaved) {
      setStateGlobal({ ...state, isStarted: false });
    } else {
      setStateGlobal({ ...state, isStarted: true });
    }
  }, []);

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-btn"
      onClick={ teste() === null ? handleFoodClick() : handleDrinkClick() }
    >
      { isStarted ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );
}
