import PropTypes from 'prop-types';
import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { indexOf } from 'lodash';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn({ dataTestId, id, type }) {
  const [state, setState] = useState({
    copyLink: false,
  });
  const { copyLink } = state;

  const TWO_SECONDS = 2000;
  const shareLink = () => {
    if (window.location.href.includes('receitas-favoritas')) {
      const newLink = window.location.href.split('/');
      newLink.splice(indexOf(newLink.length - 1), 1);
      clipboardCopy(`${newLink.join('/')}/${type}s/${id}`);
      setState({ ...state, copyLink: true });
      setTimeout(() => {
        setState({ ...state, copyLink: false });
      }, TWO_SECONDS);
    } else {
      clipboardCopy(window.location.href);
      setState({ ...state, copyLink: true });
      setTimeout(() => {
        setState({ ...state, copyLink: false });
      }, TWO_SECONDS);
    }
    if (window.location.href.includes('in-progress')) {
      const newLink = window.location.href.split('/');
      newLink.splice(indexOf(newLink.length - 1), 1);
      clipboardCopy(newLink.join('/'));
      setState({ ...state, copyLink: true });
      setTimeout(() => {
        setState({ ...state, copyLink: false });
      }, TWO_SECONDS);
    }
  };
  return (
    <div className="favorite-btn">
      <button
        type="button"
        className="share-btn"
        onClick={ shareLink }
      >
        <i class="fas fa-share-alt"></i>
      </button>
      <span>{copyLink ? 'Link copiado!' : null}</span>
    </div>
  );
}

ShareBtn.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
