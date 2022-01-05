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

    const foodFiltered = food.filter((card, index) => {
      if (index < AMOUNT_NUMBER) {
        return card;
      }
      return null;
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
        (<div
          key={ card.idMeal }
        >
          <img
            src={ card.strMealThumb }
            alt=""
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>
            {card.strMeal}

          </h3>
          <p
            data-testid={ `${index}-recipe-card` }
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
