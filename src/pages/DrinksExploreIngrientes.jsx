import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { fetchDrinksIngredients } from '../fetchApi/fetchApi';

export default function DrinksExploreIngrientes() {

   const { state, exploreDrinksIngredients, setStateGlobal} = useContext(RecipesContext);

   const NUMBER_FILTER_lIST = 12;

   const requestAPI = async () => {
     const getListIngredients = await fetchDrinksIngredients();
     const filteredIngredients = getListIngredients.filter((ingredient, index) => {
       if (index < NUMBER_FILTER_lIST ) {
         return ingredient;
       }
       return null;
     });
 
        setStateGlobal({...state, exploreDrinksIngredients: filteredIngredients})
   }  
   
   useEffect(() => {
     requestAPI();
     
   }, []);  
 
   const srcLink = 'https://www.thecocktaildb.com/images/ingredients/'

  return (
    <div>
      Drinks Explore Ingredients
      {exploreDrinksIngredients && exploreDrinksIngredients.map(({strIngredient1}, index) => ((
      <Link to={`/explorar/bebidas/${strIngredient1}`} 
     >
      <div data-testid={`${index}-ingredient-card`}>
      <h2 data-testid={`${index}-card-name`} >{strIngredient1}</h2>
      <img data-testid={`${index}-card-img`} 
      src={ `${srcLink}${strIngredient1}-Small.png` } />
      </div></Link>)
      ))}
      <Footer />
    </div>
  );
}


// Drinks Explore Ingredients
// {exploreDrinksIngredients && exploreDrinksIngredients.map(({strIngredient1}, index) => ((
// <Link to={`/explorar/bebidas/${strIngredient1}`} 
// >
// <div data-testid={`${index}-ingredient-card`}>
// <h2 data-testid={`${index}-card-name`} >{strIngredient1}</h2>
// <img data-testid={`${index}-card-img`} 
// src={ `${srcLink}${strIngredient1}-Small.png` } />
// </div></Link>)
// ))}