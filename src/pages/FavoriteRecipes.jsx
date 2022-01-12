import React, { useContext } from 'react';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import { RecipesContext } from '../contexts/RecipesContext';

export default function FavoriteRecipes() {
  const { favoriteRecipes } = useContext(RecipesContext);
  const handleClick = () => {
    favoriteRecipes.filter((fav) => fav.type === 'comida');
  };
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleClick() }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {
        favoriteRecipes.map((favorite, index) => (
          <FavoriteRecipesCard
            index={ index }
            key={ favorite.id }
            favorite={ favorite }
          />
        ))
      }
    </div>
  );
}
