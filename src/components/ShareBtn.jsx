import React from 'react';
import clipboardCopy from 'clipboard-copy';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn() {
  const { pathname } = useLocation();

  const shareLink = () => {
    clipboardCopy(pathname);
    global.alert('Link copiado!');
  };

  return (
    <button
      type="button"
      data-testid="share-btn"
      className="share-btn"
      onClick={ shareLink }
    >
      <img className="share-icon" src={ shareIcon } alt="favorite icon" />
    </button>
  );
}
