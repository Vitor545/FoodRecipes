import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { foodDetailsRequest } from '../fetchApi/fetchApi';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';
import FinishRecipeBtn from './FinishRecipeBtn';
import { updateLocalFood } from '../services/functions';
import Footer from '../components/Footer';

export default function ProgressFood() {
  const [currentFood, setCurrentFood] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ingrList, setIngrList] = useState([]);
  const { id } = useParams();

  const handleChange = ({ target }) => {
    if (ingrList.includes(target.value)) {
      const filteredList = ingrList.filter((el) => el !== target.value);
      console.log(filteredList);
      setIngrList(filteredList);
    } else {
      const newArr = [...ingrList, target.value];
      setIngrList(newArr);
    }
  };

  const renderProgressFood = () => {
    // Pegando todas as chaves de foodDetails que contenham Ingredient no nome
    const ingr = Object.keys(currentFood[0])
      .filter((key) => key.includes('Ingredient'));
    const measure = Object.keys(currentFood[0])
      .filter((key) => key.includes('Measure'));
    // Fazendo um map pelas chaves e pegando os valores dessas chaves em currentRecipe
    const values = ingr.map((ingredient) => currentFood[0][ingredient])
      .filter((el) => el !== '' && el !== null);
    const valuesMeasure = measure.map((qty) => currentFood[0][qty])
      .filter((el) => el !== '' && el !== null);
    return (
      values.map((ing, i) => (
        <div className="finish-label-container">
            <input
              id= {`finish-label-ing${i}`}
              className="input-ingredient"
              name={ ing }
              value={ `${ing} - ${valuesMeasure[i]}` }
              type="checkbox"
              checked={ ingrList.includes(`${ing} - ${valuesMeasure[i]}`)}
              onChange={ handleChange }
            ></input>
            <label
              key={ i }
              htmlFor={`finish-label-ing${i}`}
              data-testid={ `${i}-ingredient-step` }
              className="finish-label-container"
            > 
              {`${ing} - ${valuesMeasure[i] ? valuesMeasure[i] : ''}`}
            </label>
        </div>
      ))
    );
  };

  const gettingFood = async () => {
    let infoFromLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!infoFromLocal) {
      infoFromLocal = {
        cocktails: {},
        meals: {},
      };
    }
    const fillFood = await foodDetailsRequest(id);
    setCurrentFood(fillFood);
    if (!infoFromLocal.meals[id]) {
      infoFromLocal.meals = { ...infoFromLocal.meals,
        [id]: [] };
      setIngrList(infoFromLocal.meals[id]);
      localStorage.setItem('inProgressRecipes', JSON.stringify(infoFromLocal));
    }
    setIngrList(infoFromLocal.meals[id]);
    setIsLoading(false);
  };

  useEffect(() => {
    gettingFood();
    // inProgressIngredients();
  }, []);

  useEffect(() => {
    updateLocalFood(ingrList, id);
  }, [ingrList]);

  if (isLoading) {
    return (
      <h1>LOADING...</h1>
    );
  }
  return (
    <div className="body-finish">
        { currentFood
        && currentFood.map((
          { idMeal, strMeal, strCategory, strMealThumb, strInstructions },
        ) => (
          <div key={ idMeal } className="recipes-card flex-finish">
            <h3 data-testid="recipe-title">{strMeal}</h3>
            <h4 data-testid="recipe-category">{`Categoria: ${strCategory}`}</h4>
            <img
              src={ strMealThumb }
              alt={ `${strMeal}` }
              data-testid="recipe-photo"
            />
            <div className="ingredients-container">
              {renderProgressFood()}
            </div>
            <p className="instructions" data-testid="instructions">
              {strInstructions}
            </p>
            <div className="b-finish">
              <ShareBtn />
              <FavoriteBtn currentRecipe={ currentFood } />
            </div>
          <FinishRecipeBtn recipeControl={ currentFood } ingredientsControl={ ingrList } />
          </div>
        ))}
        <Footer />
    </div>
  );
}
