import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkDetailsRequest } from '../fetchApi/fetchApi';

export default function StartRecipeBtn(props) {
  const { state, isStarted, setStateGlobal } = useContext(RecipesContext);
  const { id } = useParams();
  const history = useHistory();

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

  // const handleDrinkClick = () => {
  //   const drinkIngr = Object.keys(drinkDetails[0])
  //     .filter((key) => key.includes('Ingredient'));
  //   const drinkValues = drinkIngr.map((ingredient) => drinkDetails[0][ingredient])
  //     .filter((el) => el !== null);
  //   infoFromLocal.cocktails = { ...infoFromLocal.cocktails, [id]: drinkValues };
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(infoFromLocal));
  //   if (!isStarted) setStateGlobal({ ...state, isStarted: true });
  //   // console.log(infoFromLocal);
  // };

  // const handleFoodClick = () => {
  // const ingr = Object.keys(foodDetails[0])
  //   .filter((key) => key.includes('Ingredient'));
  // const values = ingr.map((ingredient) => foodDetails[0][ingredient])
  //   .filter((el) => el !== '');
  // infoFromLocal.meals = { ...infoFromLocal.meals, [id]: values };
  // localStorage.setItem('inProgressRecipes', JSON.stringify(infoFromLocal));
  //   if (!isStarted) setStateGlobal({ ...state, isStarted: true });
  // };

  const inProgressPage = async () => {
    const some = await drinkDetailsRequest(id);
    if (some) {
      history.push(`/bebidas/${id}/in-progress`);
    } else {
      history.push(`/comidas/${id}/in-progress`);
    }
  };

  const { bugBtn } = props;

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-btn"
      onClick={ inProgressPage }
    >
      { bugBtn ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );
}
