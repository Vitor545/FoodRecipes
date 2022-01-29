import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { fetchDrinksIngredients } from '../fetchApi/fetchApi';

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

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div>
      <div className='container-por-origen-se'><p>Drink</p></div>
      <div className="card-container-conteuds">
        {exploreDrinksIngredients
        && exploreDrinksIngredients.map(({ strIngredient1 }, index) => (
          (
            <Link
              to="/bebidas"
              key={ strIngredient1 }
              onClick={ () => {
                setStateGlobal({ ...state,
                  drinkPrincipal: false,
                  drinkIngredient: true,
                  drinkIngredientLink: strIngredient1 });
              } }
              className="card"
            >
              {index === 0 ? (
                <React.Fragment data-testid={ `${index}-ingredient-card` }>
                  <img
                    data-testid="0-card-img"
                    src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                    alt={ `${strIngredient1}` }
                  />
                  <h3 data-testid={ `${index}-card-name` }>{strIngredient1}</h3>
                </React.Fragment>
              ) : (
                <React.Fragment data-testid={ `${index}-ingredient-card` }>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                    alt={ `${strIngredient1}` }
                  />
                  <h3 data-testid={ `${index}-card-name` }>{strIngredient1}</h3>
                </React.Fragment>
              )}
            </Link>)
        ))}
      </div>
      <Footer />
    </div>
  );
}
