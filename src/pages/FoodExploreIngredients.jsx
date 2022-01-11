import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <Link /* to={`/comidas${}`}  */
      data-testid={`${index}-ingredient-card`}>
      <h2 data-testid={`${index}-card-name`} >{ingredient.strIngredient}</h2>
      <img data-testid={`${index}-card-img`} 
      src={`www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`} />
      </Link>)
      ))}
<img src="www.themealdb.com/images/ingredients/chicken.png"></img>
      

      <Footer />
    </div>
  );
}
// http://localhost:3000/explorar/comidas/ingredientes/www.themealdb.com/images/ingredients/$%7Bingredient.strIngredient%7D.png

// http://localhost:3000/explorar/comidas/ingredientes/www.themealdb.com/images/ingredients/chicken.png