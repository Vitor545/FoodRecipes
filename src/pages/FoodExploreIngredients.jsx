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
      <div className='container-por-origen-se'><p>Food</p></div>
      <div className="card-container-conteuds">
        {exploreFoodsIngredients
        && exploreFoodsIngredients.map(({ strIngredient }, index) => (
          (
            <Link
              to="/comidas"
              key={ strIngredient }
              onClick={ () => {
                setStateGlobal({ ...state,
                  foodPrincipal: false,
                  foodIngredient: true,
                  foodIngredientLink: strIngredient });
              } }
              className="card"
              data-testid={ `${index}-ingredient-card` }
            >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `${srcLink}${strIngredient}-Small.png` }
                  alt={ `${strIngredient}` }
                />
                <h3 data-testid={ `${index}-card-name` }>{strIngredient}</h3>
            </Link>)
        ))}
      </div>
      <Footer />
    </div>
  );
}
