import React, { useContext } from 'react';
import DrinkCard from '../components/DrinkCard';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import SearchDrinks from '../components/SearchCard';

export default function DrinksPage() {
  const { busca } = useContext(RecipesContext);
  const drinks = () => (
    <div>
      <DrinkCard />
      <Footer />
    </div>
  );
  return (
    busca === true ? <SearchDrinks /> : drinks()
  );
}
