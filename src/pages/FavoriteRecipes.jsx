import React from 'react';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';

export default function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
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
