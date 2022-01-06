import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';
import Footer from './Footer';

const SearchDrinks = () => {
  const { foodName } = useContext(RecipesContext);

  return (
    <div>
      {console.log(foodName)}
      <div>teste</div>
      <Footer />
    </div>
  );
};

export default SearchDrinks;
