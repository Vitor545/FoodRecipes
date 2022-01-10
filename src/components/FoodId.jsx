import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { foodDetailsRequest, urlNameBebidas } from '../fetchApi/fetchApi';
import FoodsRecommended from './FoodsRecommended';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';
import StartRecipeBtn from './StartRecipeBtn';
import { RecipesContext } from '../contexts/RecipesContext';

export default function FoodId() {
  // const { foodName } = useContext(RecipesContext);
  const { state, foodDetails, setStateGlobal } = useContext(RecipesContext);
  const [bugButton, setBugButton] = useState(false);

  const { id } = useParams();

  const requestApi = async () => {
    const foodRecommended = await urlNameBebidas('');
    const food = await foodDetailsRequest(id);
    // setCurrent(food);
    // const recomendedDrinks = await drinkRecipesAPI();
    setStateGlobal({ ...state, foodRecom: foodRecommended, foodDetails: food });
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
        >
          {`${ing} - ${valuesMeasure[i]}`}
        </li>
      ))
    );
  };

  useEffect(() => {
    requestApi();
    let infoFromLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!infoFromLocal) {
      infoFromLocal = {
        cocktails: {},
        meals: {},
      };
    }
    const isSaved = Object.keys(infoFromLocal.meals).includes(id)
      || Object.keys(infoFromLocal.cocktails).includes(id);
    if (isSaved) {
      setBugButton(true);
      // setStateGlobal({ ...state, isStarted: true });
    } else {
      setBugButton(false);
      // setStateGlobal({ ...state, isStarted: false });
    }
  }, []);

  return (
    <div>
      { foodDetails
      && foodDetails.map((
        { idMeal, strMeal, strCategory, strMealThumb, strInstructions, strYoutube },
      ) => (
        <div key={ idMeal } className="recipes-card">
          <h3 data-testid="recipe-title">{strMeal}</h3>
          <h4 data-testid="recipe-category">{`Categoria: ${strCategory}`}</h4>
          <img
            src={ strMealThumb }
            alt={ `${strMeal}` }
            data-testid="recipe-photo"
          />
          <ul>
            {renderIngredients()}
          </ul>
          <p data-testid="instructions">
            {strInstructions}
          </p>
          <video width="320" height="240" controls data-testid="video">
            <track kind="captions" />
            <source src={ strYoutube } type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
          <div>
            <ShareBtn />
            <FavoriteBtn currentRecipe={ foodDetails } />
            <StartRecipeBtn bugbtn={ bugButton } />
          </div>
          <div className="recommended-recipes ">
            <FoodsRecommended />
          </div>
        </div>
      ))}
    </div>
  );
}
