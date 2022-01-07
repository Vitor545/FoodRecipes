import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn() {
  const [state, setState] = useState(false);

  const shareLink = () => {
    clipboardCopy(window.location.href);
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 2000);
  };

  return (
    <div className="favorite-btn">
      <button
        type="button"
        data-testid="share-btn"
        className="share-btn"
        onClick={ shareLink }
      >
        <img className="share-icon" src={ shareIcon } alt="favorite icon" />
      </button>
      <span>{state ? 'Link copiado!' : null}</span>
    </div>
  );
}
