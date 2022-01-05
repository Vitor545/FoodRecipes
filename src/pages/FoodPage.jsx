import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { RecipesContext } from '../contexts/RecipesContext';
import { foodRecipesAPI } from '../fetchApi/fetchApi';

export default function FoodPage() {
  const { state, setStateGlobal, foodRecipes } = useContext(RecipesContext);

  const AMOUNT_NUMBER = 12;

  const requestAPI = async () => {
    const food = await foodRecipesAPI();
    console.log(food);
    const foodFiltered = food.filter((food, index) => {
      if (index <= AMOUNT_NUMBER) {
        return food;
      }
    });
    console.log(foodFiltered);
    setStateGlobal({ ...state, foodRecipes: foodFiltered });
  };

  useEffect(() => {
    requestAPI();
  }, []);

  return (

    <div>
      <Header />
      {foodRecipes && foodRecipes.map((card, index) => (
        (<div
          key={ card.idMeal }
        >
          <img
            src={ card.strMealThumb }
            alt=""
            data-testid={ ` ${index}-card-img ` }
          />
          <h3 data-testid={ ` ${index}-card-name ` }>
            {card.strMeal}

          </h3>
          <p
            data-testid={ ` ${index}-recipe-card ` }
          >
            {card.strSource}

          </p>
        </div>)
      ))}
      Food Page
      <Footer />
    </div>
  );
}
