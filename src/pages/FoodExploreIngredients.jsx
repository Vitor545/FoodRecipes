import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { fetchFoodsIngredients } from '../fetchApi/fetchApi';

export default function FoodExploreIngredients() {
  const { state, exploreFoodsIngredients, setStateGlobal } = useContext(RecipesContext);

  const MIN_LENGTH = 12;

  const requestAPI = async () => {
    const getListIngredients = await fetchFoodsIngredients();
    const filteredIngredients = getListIngredients.filter((ingredient, index) => {
      if (index < MIN_LENGTH) {
        return ingredient;
      }
      return null;
    });

    setStateGlobal({ ...state, exploreFoodsIngredients: filteredIngredients });
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const srcLink = 'https://www.themealdb.com/images/ingredients/';

  return (
    <div>
      Food Explore Ingredients

      {exploreFoodsIngredients
      && exploreFoodsIngredients.map(({ strIngredient }, index) => (
        (
          <Link
            to={ `/comidas/${strIngredient}` }
            key={ strIngredient }
          >
            <div className="card" data-testid={ `${index}-ingredient-card` }>
              <h2 data-testid={ `${index}-card-name` }>{strIngredient}</h2>
              <img
                data-testid={ `${index}-card-img` }
                src={ `${srcLink}${strIngredient}-Small.png` }
                alt={ `${strIngredient}` }
              />
            </div>
          </Link>)
      ))}
      <Footer />
    </div>
  );
}
