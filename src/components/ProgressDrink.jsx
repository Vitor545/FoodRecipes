import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { drinkDetailsRequest } from '../fetchApi/fetchApi';
import { updateLocalDrink } from '../services/functions';
import FavoriteBtn from './FavoriteBtn';
import FinishRecipeBtn from './FinishRecipeBtn';
import ShareBtn from './ShareBtn';

export default function ProgressDrink() {
  const [currentDrink, setCurrentDrink] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ingrList, setIngrList] = useState([]);
  const { id } = useParams();

  const handleChange = ({ target }) => {
    if (ingrList.includes(target.name)) {
      const filteredList = ingrList.filter((el) => el !== target.name);
      // console.log(filteredList);
      setIngrList(filteredList);
    } else {
      const newArr = [...ingrList, target.name];
      setIngrList(newArr);
    }
  };

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
            name={ ing }
            type="checkbox"
            checked={ ingrList.includes(ing) }
            onChange={ handleChange }
          />
          {`${ing} - ${valuesMeasure[i] ? valuesMeasure[i] : ''}`}
        </label>
      ))
    );
  };

  const gettingDrink = async () => {
    let infoFromLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!infoFromLocal) {
      infoFromLocal = {
        cocktails: {},
        meals: {},
      };
    }
    const fillDrink = await drinkDetailsRequest(id);
    setCurrentDrink(fillDrink);
    if (!infoFromLocal.cocktails[id]) {
      infoFromLocal.cocktails = { ...infoFromLocal.cocktails,
        [id]: [] };
      setIngrList(infoFromLocal.cocktails[id]);
      localStorage.setItem('inProgressRecipes', JSON.stringify(infoFromLocal));
    }
    setIngrList(infoFromLocal.cocktails[id]);
    setIsLoading(false);
  };

  useEffect(() => {
    gettingDrink();
  }, []);

  useEffect(() => {
    updateLocalDrink(ingrList, id);
  }, [ingrList]);

  if (isLoading) {
    return (
      <h1>LOADING...</h1>
    );
  }
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
      <FinishRecipeBtn recipeControl={ currentDrink } ingredientsControl={ ingrList } />
    </div>
  );
}
