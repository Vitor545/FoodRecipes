import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { fetchFoodsIngredients } from '../fetchApi/fetchApi';

export default function FoodExploreIngredients() {

  const {state, exploreFoodsIngredients, setStateGlobal} = useContext(RecipesContext);

  const NUMBER_FILTER_lIST = 12;

  const requestAPI = async () => {
    const getListIngredients = await fetchFoodsIngredients();
    const filteredIngredients = getListIngredients.filter((ingredient, index) => {
      if (index < NUMBER_FILTER_lIST ) {
        return ingredient;
      }
      return null;
    });

       setStateGlobal({...state, exploreFoodsIngredients: filteredIngredients})
  }  
  
  useEffect(() => {
    requestAPI();
    
  }, []);  

  const srcLink = 'https://www.themealdb.com/images/ingredients/'

  return (
    <div>
      Food Explore Ingredients

      {exploreFoodsIngredients && exploreFoodsIngredients.map((ingredient, index) => ((
      <Link to={`/explorar/comidas/${ingredient.strIngredient}`} 
      data-testid={`${index}-ingredient-card`}>
      <h2 data-testid={`${index}-card-name`} >{ingredient.strIngredient}</h2>
      <img data-testid={`${index}-card-img`} 
      src={ `${srcLink}${ingredient.strIngredient}-Small.png` } />
      </Link>)
      ))}
      <Footer />
    </div>
  );
}
