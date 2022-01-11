import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { drinkDetailsRequest } from '../fetchApi/fetchApi';
import FavoriteBtn from './FavoriteBtn';
import FinishRecipeBtn from './FinishRecipeBtn';
import ShareBtn from './ShareBtn';

export default function ProgressDrink() {
  const { id } = useParams();
  const [currentDrink, setCurrentDrink] = useState([]);
  let infoFromLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!infoFromLocal) {
    infoFromLocal = {
      cocktails: {},
      meals: {},
    };
  }

  const renderProgressDrink = () => {
    // Pegando todas as chaves de foodDetails que contenham Ingredient no nome
    const ingr = Object.keys(currentDrink[0])
      .filter((key) => key.includes('Ingredient'));
    const measure = Object.keys(currentDrink[0])
      .filter((key) => key.includes('Measure'));
    // Fazendo um map pelas chaves e pegando os valores dessas chaves em currentRecipe
    const values = ingr.map((ingredient) => currentDrink[0][ingredient])
      .filter((el) => el !== '' && el !== null);
    const valuesMeasure = measure.map((qty) => currentDrink[0][qty])
      .filter((el) => el !== '' && el !== null);
    return (
      values.map((ing, i) => (
        <label
          key={ i }
          htmlFor="input-ingredient"
          data-testid={ `${i}-ingredient-step` }
        >
          <input
            className="input-ingredient"
            type="checkbox"
          />
          {`${ing} - ${valuesMeasure[i] ? valuesMeasure[i] : ''}`}
        </label>
      ))
    );
  };

  const gettingDrink = async () => {
    const fillDrink = await drinkDetailsRequest(id);
    setCurrentDrink(fillDrink);
    const ingr = Object.keys(fillDrink[0])
      .filter((key) => key.includes('Ingredient'));
    const values = ingr.map((ingredient) => fillDrink[0][ingredient])
      .filter((el) => el !== null);
    infoFromLocal.cocktails = { ...infoFromLocal.cocktails, [id]: values };
    localStorage.setItem('inProgressRecipes', JSON.stringify(infoFromLocal));
  };

  useEffect(() => {
    gettingDrink();
  }, []);

  return (
    <div>
      { currentDrink
      && currentDrink.map((
        { idDrink, strDrink, strDrinkThumb, strInstructions, strAlcoholic },
      ) => (
        // Problema com key única
        <div key={ idDrink } className="recipes-card">
          <h3 data-testid="recipe-title">{strDrink}</h3>
          <h4 data-testid="recipe-category">{`Categoria: ${strAlcoholic}`}</h4>
          <img
            src={ strDrinkThumb }
            alt={ `${strDrink}` }
            data-testid="recipe-photo"
          />
          <div className="ingredients-container">
            {renderProgressDrink()}
          </div>
          <p data-testid="instructions">
            {strInstructions}
          </p>
          <div>
            <FavoriteBtn currentRecipe={ currentDrink } />
            <ShareBtn />
          </div>
        </div>
      ))}
      <FinishRecipeBtn />
    </div>
  );
}
