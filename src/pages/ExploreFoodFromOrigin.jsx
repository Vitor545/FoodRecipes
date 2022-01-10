import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { fetchFoodAreas, fetchFoodFromOrigin } from '../fetchApi/fetchApi';

export default function ExploreFoodFromOrigin() {
  const { foodAreas, state, setStateGlobal, foodFromAreas } = useContext(RecipesContext);

  const TWELVE_FIRSTS_FOODS = 12;
  const requestApi = async () => {
    const foodOrigins = await fetchFoodAreas();
    const foodCard = await fetchFoodFromOrigin('American');
    const filteredFoodCard = foodCard.filter((food, index) => {
      if (index < TWELVE_FIRSTS_FOODS) {
        return food;
      }
      return null;
    });
    setStateGlobal({ ...state, foodAreas: foodOrigins, foodFromAreas: filteredFoodCard });
  };

  const handleChange = async ({ target }) => {
    const { value } = target;
    const foodCard = await fetchFoodFromOrigin(value);
    const filteredFoodCard = foodCard.filter((fd, index) => {
      if (index < TWELVE_FIRSTS_FOODS) {
        return fd;
      }
      return null;
    });
    setStateGlobal({ ...state, foodFromAreas: filteredFoodCard });
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <div>
      Explore Food From Origin
      <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
        <option>All</option>
        { foodAreas && foodAreas.map(({ strArea }) => {
          if (strArea === 'American') {
            return (
              <option data-testid={ `${strArea}-option` } selected>{strArea}</option>
            );
          }
          return (
            <option key={ strArea } data-testid={ `${strArea}-option` }>{strArea}</option>
          );
        })}
      </select>

      {foodFromAreas && foodFromAreas.map(({ strMeal, strMealThumb }, index) => (
        <div key={ strMeal } data-testid={ `${index}-recipe-card` }>
          <img src={ strMealThumb } alt="" data-testid={ `${index}-card-img` } />
          <h2 data-testid={ `${index}-card-name` }>{strMeal}</h2>
        </div>
      ))}
      <Footer />
    </div>
  );
}
