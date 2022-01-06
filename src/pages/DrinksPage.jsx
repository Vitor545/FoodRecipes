import React, { useEffect, useContext, useState } from 'react';
import DrinkCard from '../components/DrinkCard';
import Footer from '../components/Footer';
import { RecipesContext } from '../contexts/RecipesContext';
import { drinkRecipesAPI } from '../fetchApi/fetchApi';
import SearchDrinks from '../components/SearchCard';

export default function DrinksPage() {
  const { busca } = useContext(RecipesContext);
  const [teste, setTeste] = useState('');

 

 return (
    <div>
      <DrinkCard />
      <Footer />
    </div>
  );
 
}
