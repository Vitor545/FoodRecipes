import React, { useContext, useEffect } from 'react';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import { RecipesContext } from '../contexts/RecipesContext';
import Footer from '../components/Footer';

export default function FavoriteRecipes() {
  const { setFavoriteRecipes,
    favoriteRecipes, handleUpdate } = useContext(RecipesContext);

  const handleClick = (type) => {
    const results = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredFavoriteRecipes = type ? results
      .filter((fav) => fav.type === type) : results;
    setFavoriteRecipes(filteredFavoriteRecipes);
  };
  useEffect(() => {
    handleUpdate();
  }, []);

  return (
    <div>
      <div className="card-btns">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClick() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleClick('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClick('bebida') }

        >
          Drinks
        </button>
      </div>
      <div className="card-container-conteuds">
        { favoriteRecipes &&
          favoriteRecipes.map((favorite, index) => (
            <FavoriteRecipesCard
              index={ index }
              key={ favorite.id }
              favorite={ favorite }
            />
          ))
        }
      </div>
      <Footer />
    </div>
  );
}
