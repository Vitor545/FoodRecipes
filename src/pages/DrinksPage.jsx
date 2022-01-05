import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkRecipesAPI } from '../fetchApi/fetchApi';

export default function DrinksPage() {
  const { state, setStateGlobal, drinkRecipes } = useContext(RecipesContext);

  const AMOUNT_NUMBER = 12;

  const requestAPI = async () => {
    const drinks = await drinkRecipesAPI();
    const drinksFiltered = drinks.filter((el, index) => {
      if (index <= AMOUNT_NUMBER) {
        return el;
      }
      return null;
    });
    console.log(drinksFiltered);
    setStateGlobal({ ...state, drinkRecipes: drinksFiltered });
  };

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div>
      {drinkRecipes && drinkRecipes.map((el, index) => ((
        <div
          key={ el.idDrink }
        >
          <img
            src={ el.strDrinkThumb }
            alt=""
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>
            {el.strDrink}

          </h3>
          <p
            data-testid={ `${index}-recipe-card` }
          >
            {el.strInstructions}

          </p>
        </div>)
      ))}
      <Footer />
    </div>
  );
}
