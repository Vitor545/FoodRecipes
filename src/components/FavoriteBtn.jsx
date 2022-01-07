import React, { useState } from 'react';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteBtn() {
  const [state, setState] = useState({
    isFavorited: false,
  });

  const { isFavorited } = state;

  const handleFavoriteIcon = () => {
    if (!isFavorited) {
      setState({ ...state, isFavorited: true });
    } else {
      setState({ ...state, isFavorited: false });
    }
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      className="favorite-btn"
      onClick={ handleFavoriteIcon }
    >
      <img
        className="favorite-icon"
        src={ !isFavorited ? blackFavoriteIcon : whiteFavoriteIcon }
        alt="favorite icon"
      />
    </button>
  );
}
