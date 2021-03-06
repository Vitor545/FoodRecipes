import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { foodDetailsRequest,
  urlNameBebidas } from '../fetchApi/fetchApi';
import FoodsRecommended from './FoodsRecommended';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';
import StartRecipeBtn from './StartRecipeBtn';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';

export default function FoodId({ history }) {
  const { state, foodDetails, setStateGlobal } = useContext(RecipesContext);

  const { id } = useParams();
  const requestApi = async () => {
    const foodRecommended = await urlNameBebidas('');
    const food = await foodDetailsRequest(id);
    setStateGlobal({ ...state,
      foodRecom: foodRecommended,
      foodDetails: food,
      foodDetail: true,
      foodIngredient: false });
  };

  const renderIngredients = () => {
    // Pegando todas as chaves de foodDetails que contenham Ingredient no nome
    const ingr = Object.keys(foodDetails[0])
      .filter((key) => key.includes('Ingredient'));
    const measure = Object.keys(foodDetails[0])
      .filter((key) => key.includes('Measure'));
    // Fazendo um map pelas chaves e pegando os valores dessas chaves em foodDetails
    const values = ingr.map((ingredient) => foodDetails[0][ingredient])
      .filter((el) => el !== '');
    const valuesMeasure = measure.map((qty) => foodDetails[0][qty])
      .filter((el) => el !== '');
    return (
      values.map((ing, i) => (
        <li
          key={ i }
          data-testid={ `${i}-ingredient-name-and-measure` }
          className="finish-label-container"
        >
          {`${ing} - ${valuesMeasure[i]}`}
        </li>
      ))
    );
  };

  const renderCard = () => (
    <div className="body-finish">
      { foodDetails
      && foodDetails.map((
        { idMeal, strMeal, strCategory, strMealThumb, strInstructions, strYoutube },
      ) => (
        <div key={ idMeal } className="recipes-card flex-finish">
          <h3 data-testid="recipe-title">{strMeal}</h3>
          <h4 data-testid="recipe-category">{`Categoria: ${strCategory}`}</h4>
          <img
            src={ strMealThumb }
            alt={ `${strMeal}` }
            data-testid="recipe-photo"
          />
          <ul className='ingredients-container'>
            { renderIngredients() }
          </ul>
          <p className='instructions' data-testid="instructions">
            {strInstructions}
          </p>

          <video className="video-recipe" width="320" height="240" controls data-testid="video">
            <track kind="captions" />
            <source src={ strYoutube } type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
          <div className='b-finish'>
            <ShareBtn />
            <FavoriteBtn currentRecipe={ foodDetails } />
          </div>
          <div className="recommended-recipes ">
            <FoodsRecommended />
          </div>
          <StartRecipeBtn history={ history } />
        </div>
      ))}
        <Footer />
    </div>
  );

  // const renderMealsByIngredient = () => (
  //   <div>
  //     { foodDetails
  // && foodDetails
  //   .map(({ idMeal, strMeal, strMealThumb }, index) => (
  //     <Link key={ idMeal } to="*">
  //       { index === 0 ? (
  //         <div key={ idMeal } className="recipes-card" data-testid="0-recipe-card">
  //           <h3 data-testid="0-recipe-title">{strMeal}</h3>
  //           <img
  //             src={ strMealThumb }
  //             alt={ `${strMeal}` }
  //             data-testid="0-recipe-photo"
  //           />
  //         </div>
  //       ) : (
  //         <div
  //           key={ idMeal }
  //           className="recipes-card"
  //           data-testid={ `${index}-recipe-card` }
  //         >
  //           <h3 data-testid="recipe-title">{strMeal}</h3>
  //           <img
  //             src={ strMealThumb }
  //             alt={ `${strMeal}` }
  //             data-testid="recipe-photo"
  //           />
  //         </div>)}
  //     </Link>
  //   ))}
  //   </div>
  // );

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <div>
      { renderCard() }
    </div>
  );
}

FoodId.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
