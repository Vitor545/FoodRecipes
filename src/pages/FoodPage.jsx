import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { foodRecipesAPI } from '../fetchApi/fetchApi';

export default function FoodPage() {
  const { state, setStateGlobal, foodRecipes } = useContext(RecipesContext);

  const requestAPI = async () => {
    const food = await foodRecipesAPI();
    const foodFiltered = food.filter((el, index) => {
      if (index <= 12) return el;
    });
    console.log(foodFiltered);
    setStateGlobal({ ...state, foodRecipes: foodFiltered });
  };

  useEffect(() => {
    requestAPI();
  }, []);

  return (

    <div>
      {foodRecipes && foodRecipes.map((card, index) => (

        (<div key={ card.idMeal }>{card.idMeal}</div>)

      ))}
      Food Page
      <Footer />
    </div>
  );
}
