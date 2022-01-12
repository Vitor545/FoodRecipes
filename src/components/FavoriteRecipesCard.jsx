import React from 'react';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';

export default function FavoriteRecipesCard({ index, favorite }) {
  const { id, type, area, category, alcoholicOrNot } = favorite;
  return (
    <div className="card">
      <img src={ favorite.image } alt="share" data-testid={ `${index}-horizontal-image` } />
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {favorite.type === 'comida' ? `${favorite.area} - ${favorite.category}`
            : favorite.alcoholicOrNot }
        </p>
        <h2 data-testid={`${index}-horizontal-name`}>{favorite.name}</h2>
        <FavoriteBtn data-testid={`${index}-horizontal-favorite-btn` } currentRecipe={ favorite } />
        <ShareBtn data-testid={ `${index}-horizontal-share-btn` } />
        {/* <button
          type="button"
          onClick={ shareLink }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share"
          />
        </button>
        <span>{copyLink ? 'Link copiado!' : null}</span>
        <button
          type="button"
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="favorite"
          />
        </button> */}
      </div>
      <div />
    </div>
  );
}
