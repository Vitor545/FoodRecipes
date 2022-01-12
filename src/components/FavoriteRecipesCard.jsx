import PropTypes from 'prop-types';
import React from 'react';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';

export default function FavoriteRecipesCard({ index, favorite, update }) {
  return (
    <div className="card">
      <img
        src={ favorite.image }
        alt="share"
        data-testid={ `${index}-horizontal-image` }
      />
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {favorite.type === 'comida' ? `${favorite.area} - ${favorite.category}`
            : favorite.alcoholicOrNot }
        </p>
        <h2 data-testid={ `${index}-horizontal-name` }>{favorite.name}</h2>
        <FavoriteBtn
          dataTestId={ `${index}-horizontal-favorite-btn` }
          currentRecipe={ favorite }
          update={ update }
        />
        <ShareBtn
          dataTestId={ `${index}-horizontal-share-btn` }
          type={ favorite.type }
          id={ favorite.id }
        />
      </div>
      <div />
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  favorite: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
};
