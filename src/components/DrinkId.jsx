import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import DrinksRecommended from './DrinksRecommended';

export default function DrinkId() {
  const { saveDrinkRecipes } = useContext(RecipesContext);

  const { id } = useParams();

  const element = saveDrinkRecipes.find((drink) => drink.idDrink === id);
  const ingredientsKeys = Object.keys(element)
    .filter((el) => el.includes('strIngredient'));

  const ingredients = ingredientsKeys.map((key) => element[key])
    .filter((el) => el !== null);

  return (
    <div>
      <h3 data-testid="recipe-title">{element.strDrink}</h3>
      <h4 data-testid="recipe-category">{`Categoria: ${element.strCategory}`}</h4>
      <img src={ element.strDrinkThumb } alt={ `${element.strDrink}` } />
      <ul>
        {ingredients.map((ing, index) => (
          <li
            key={ ing }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ing}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">
        {element.strInstructions}
      </p>
      <video width="250" height="250" controls data-testid="video">
        <track kind="captions" />
        <source src={ element.strVideo } type="video/mp4" />
        <source src="movie.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
      <div className="recipe-details-btns">
        <button type="button" data-testid="share-btn">Compartilhar Receita</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>
      <div className="recommended-recipes">
        <DrinksRecommended />
      </div>
    </div>
  );
}
