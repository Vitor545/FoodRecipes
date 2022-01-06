import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';

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
      {ingredients}
      <div className='recipe-details-btns'>
        <button type='submit' data-testid="share-btn">Compartilhar Receita</button>
        <button type='submit' data-testid="favorite-btn">Favoritar</button>
      </div>
    </div>
  );
}
