import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { fetchImgIngredients, fetchIngredients } from '../fetchApi/fetchApi';

export default function FoodExploreIngredients() {

  const {state, exploreIngredients, exploreImgIngredients, setStateGlobal} = useContext(RecipesContext);

  const NUMBER_FILTER_lIST = 12;

  const requestAPI = async () => {
    const getListIngredients = await fetchIngredients();
    const filteredIngredients = getListIngredients.filter((ingredient, index) => {
      if (index < NUMBER_FILTER_lIST ) {
        return ingredient;
      }
      return null;
    });

    // const getImgIngredients = await fetchImgIngredients();
    // getImgIngredients.map((img) => img)

    setStateGlobal({...state, exploreIngredients: filteredIngredients, getImgIngredients: exploreImgIngredients})
  }  
  
  useEffect(() => {
    requestAPI();
    
  }, []);
  
  console.log(exploreIngredients, exploreImgIngredients);
  return (
    <div>
      Food Explore Ingredients

      {exploreIngredients && exploreIngredients.map((ingredient, index) => ((
      <div data-testid={`${index}-ingredient-card`}>
      <h2 data-testid={`${index}-card-name`} >{ingredient.strIngredient}</h2>
      <img data-testid={`${index}-card-img`} 
      src={`www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`} />
      </div>)
      ))}

      

      <Footer />
    </div>
  );
}
