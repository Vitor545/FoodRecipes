import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkRecipesAPI } from '../fetchApi/fetchApi';

export default function DrinksPage() {
  const { state, setStateGlobal, drinkRecipes } = useContext(RecipesContext);

  const LENGHT = 12;
  const requestAPI = async () => {
    const drinks = await drinkRecipesAPI();
    const drinksFiltered = drinks.filter((el, index) => {
      if (index <= LENGHT) return el;
    });
  };

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div>
      Drinks Page
      <Footer />
    </div>
  );
}
