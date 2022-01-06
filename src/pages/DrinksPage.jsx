import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkRecipesAPI } from '../fetchApi/fetchApi';
import SearchDrinks from '../components/SearchCard';

export default function DrinksPage() {
  const { state, setStateGlobal, drinkRecipes, busca } = useContext(RecipesContext);

  const AMOUNT_NUMBER = 12;

  const requestAPI = async () => {
    const drinks = await drinkRecipesAPI();
    const drinksFiltered = drinks.filter((el, index) => {
      if (index < AMOUNT_NUMBER) {
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

  const initialDrinks = () => (
    <div>
      {drinkRecipes && drinkRecipes.map((el, index) => ((
        <div
          key={ el.idDrink }
          className="card-drink"
        >
          <img
            src={ el.strDrinkThumb }
            className="drink-teste"
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
  return (
    busca === true ? <SearchDrinks /> : initialDrinks()
  );
}
