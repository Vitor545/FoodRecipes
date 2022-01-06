import React, { useEffect, useState, useContext } from 'react';
import Footer from '../components/Footer';
import { foodRecipesAPI } from '../fetchApi/fetchApi';
import SearchDrinks from '../components/SearchCard';
import { RecipesContext } from '../contexts/RecipesContext';

export default function FoodPage() {
  const { busca } = useContext(RecipesContext);
  const [teste, setTeste] = useState('');
  useEffect(() => {
    const funcTst = async () => {
      const AMOUNT_NUMBER = 12;
      const food = await foodRecipesAPI();
      console.log(food);
      const foodFiltered = food.filter((el, index) => {
        if (index < AMOUNT_NUMBER) {
          return el;
        }
        return null;
      });
      console.log(foodFiltered);
      setTeste(foodFiltered);
    };
    funcTst();
  }, []);

  const initialFoods = () => (
    <div>
      {teste && teste.map((el, index) => ((
        <div
          key={ el.idMeal }
          className="card-drink"
        >
          <img
            src={ el.strMealThumb }
            alt=""
            className="drink-teste"
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>
            {el.strMeal}

          </h3>
          <p
            data-testid={ `${index}-recipe-card` }
          >
            {el.strSource}

          </p>
        </div>)
      ))}
      Food Page
      <Footer />
    </div>
  );
  return (
    busca === true ? <SearchDrinks /> : initialFoods()
  );
}
