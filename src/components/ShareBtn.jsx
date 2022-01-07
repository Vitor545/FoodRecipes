import React from 'react';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn() {
  return (
    <button
      type="button"
      data-testid="share-btn"
      className="share-btn"
    >
      <img className="share-icon" src={ shareIcon } alt="favorite icon" />
    </button>
  );
}
