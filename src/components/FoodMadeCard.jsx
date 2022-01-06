import React from 'react';
import shareIcon from '../images/shareIcon.svg';

export default function FoodMadeCard({ index, food }) {
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
      <div>
        <h2 data-testid={ `${index}-horizontal-top-text` }>{food}</h2>
        <p data-testid={ `${index}-horizontal-name` }> teste</p>
        <span data-testid={ `${index}-horizontal-done-date` }>teste</span>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
        >
          <img src={ shareIcon } alt="share" />
        </button>
      </div>
    </div>
  );
}
