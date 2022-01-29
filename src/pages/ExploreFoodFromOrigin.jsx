import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import {
  fetchFoodAreas,
  fetchFoodFromOrigin,
  foodRecipesAPI,
} from '../fetchApi/fetchApi';

export default function ExploreFoodFromOrigin() {
  const { foodAreas, state, setStateGlobal, foodFromAreas } = useContext(RecipesContext);

  const TWELVE_FIRSTS_FOODS = 12;
  const requestApi = async () => {
    const foodOrigins = await fetchFoodAreas();
    console.log(foodOrigins);
    const foodCard = await fetchFoodFromOrigin('American');
    const filteredFoodCard = foodCard.filter((food, index) => {
      if (index < TWELVE_FIRSTS_FOODS) {
        return food;
      }
      return null;
    });
    setStateGlobal({
      ...state,
      foodAreas: foodOrigins,
      foodFromAreas: filteredFoodCard,
    });
  };

  const handleChange = async ({ target }) => {
    const { value } = target;
    if (value !== 'All') {
      const foodCard = await fetchFoodFromOrigin(value);
      const filteredFoodCard = foodCard.filter((fd, index) => {
        if (index < TWELVE_FIRSTS_FOODS) {
          return fd;
        }
        return null;
      });
      setStateGlobal({ ...state, foodFromAreas: filteredFoodCard });
    } else {
      const meals = await foodRecipesAPI();
      const filteredMeals = meals.filter((fod, index) => {
        if (index < TWELVE_FIRSTS_FOODS) {
          return fod;
        }
        return null;
      });
      setStateGlobal({ ...state, foodFromAreas: filteredMeals });
    }
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <div>
      <div className="container-por-origen">
        <div className='container-por-origen-se'>
          <p>Food</p>
          <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
            <option data-testid="All-option">All</option>
            {foodAreas
              && foodAreas.map(({ strArea }) => {
                if (strArea === 'American') {
                  return (
                    <option data-testid={ `${strArea}-option` } selected>
                      {strArea}
                    </option>
                  );
                }
                return (
                  <option key={ strArea } data-testid={ `${strArea}-option` }>
                    {strArea}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="card-container-conteuds">
          {foodFromAreas
            && foodFromAreas.map(({ strMeal, strMealThumb, idMeal }, index) => (
              <Link
                key={ strMeal }
                to={ `/comidas/${idMeal}`}
                data-testid={ `${index}-recipe-card` }
                className="card"
              >
                  <img
                    src={ strMealThumb }
                    alt=""
                    data-testid={ `${index}-card-img` }
                  />
                  <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
              </Link>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
