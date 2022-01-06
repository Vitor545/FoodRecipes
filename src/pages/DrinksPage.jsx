import React, { useEffect, useContext, useState } from 'react';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkRecipesAPI } from '../fetchApi/fetchApi';
import SearchDrinks from '../components/SearchCard';

export default function DrinksPage() {
  const { busca } = useContext(RecipesContext);
  const [teste, setTeste] = useState('');

  useEffect(() => {
    const funcTst = async () => {
      const AMOUNT_NUMBER = 12;
      const drinks = await drinkRecipesAPI();
      const drinksFiltered = drinks.filter((el, index) => {
        if (index < AMOUNT_NUMBER) {
          return el;
        }
        return null;
      });
      console.log(drinksFiltered);
      setTeste(drinksFiltered);
    };
    funcTst();
  }, []);

  const initialDrinks = () => (
    <div>
      {teste && teste.map((el, index) => ((
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
