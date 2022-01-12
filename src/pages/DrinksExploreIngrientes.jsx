import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { fetchDrinksIngredients, drinkRecipesAPI } from '../fetchApi/fetchApi';

export default function DrinksExploreIngrientes() {
  const { state, exploreDrinksIngredients, setStateGlobal } = useContext(RecipesContext);

  const MIN_LENGTH = 12;

  const requestAPI = async () => {
    const getListIngredients = await fetchDrinksIngredients();
    const filteredIngredients = getListIngredients.filter((ingredient, index) => {
      if (index < MIN_LENGTH) {
        return ingredient;
      }
      return null;
    });

    setStateGlobal({ ...state, exploreDrinksIngredients: filteredIngredients });
  };

  const requestRecipesAPI = async () => {
    const getRecipes = await drinkRecipesAPI();
    console.log(getRecipes);
    const filteredRecipes = getRecipes.map((recipes) => recipes.strInstructions === exploreDrinksIngredients);
    
  };

  useEffect(() => {
    requestAPI();
    requestRecipesAPI();
  }, []);

  return (
    <div>
      Drinks Explore Ingredients
      {exploreDrinksIngredients
      && exploreDrinksIngredients.map(({ strIngredient1 }, index) => (
        (
          <Link
            to={ `/explorar/bebidas/${strIngredient1}` }
            key={ strIngredient1 }
          >
            {index === 0 ? (
              <div data-testid={ `${index}-ingredient-card` } className="card">
                <h2 data-testid={ `${index}-card-name` }>{strIngredient1}</h2>
                <img
                  data-testid="0-card-img"
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  alt={ `${strIngredient1}` }
                />
              </div>
            ) : (
              <div data-testid={ `${index}-ingredient-card` } className="card">
                <h2 data-testid={ `${index}-card-name` }>{strIngredient1}</h2>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  alt={ `${strIngredient1}` }
                />
              </div>
            )}
          </Link>)
      ))}
      <Footer />
    </div>
  );
}
