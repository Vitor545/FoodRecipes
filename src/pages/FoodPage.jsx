import React, { useContext } from 'react';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import SearchDrinks from '../components/SearchCard';

export default function FoodPage() {
  const { busca } = useContext(RecipesContext);
  const foods = () => (
    <div>
      <FoodCard />
      <Footer />
    </div>
  );
  return (
    busca === true ? <SearchDrinks /> : foods()
  );
}
