import React from 'react';
import favoriteIcon from '../images/blackHeartIcon.svg';

export default function FavoriteBtn() {
  return (
    <button
      type="button"
      data-testid="favorite-btn"
      className="favorite-btn"
    >
      <img className="favorite-icon" src={ favoriteIcon } alt="favorite icon" />
    </button>
  );
}
