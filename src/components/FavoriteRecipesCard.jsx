import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import ShareBtn from './ShareBtn';

export default function FavoriteRecipesCard({ index, favorite }) {
  const { handleUpdate } = useContext(RecipesContext);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredFavorites = favorites
      .filter((obj) => obj.id !== favorite.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavorites));
    handleUpdate();
  };

  const recipeLink = (type, id) => (`/${type}s/${id}`);
  return (
    <div className="card-favorite">
      <Link to={ () => recipeLink(favorite.type, favorite.id) }>
        <img
          src={ favorite.image }
          alt="share"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="flex-favorite">
      <div className="b-favorite">
          <button
            type="button"
            className="favorite-btn"
            onClick={ handleFavorite }
          >
           <i class="fas fa-heart"></i>
          </button>
          <ShareBtn
            dataTestId={ `${index}-horizontal-share-btn` }
            type={ favorite.type }
            id={ favorite.id }
          />
        </div>
        <div className="p-favorite">
          <p data-testid={ `${index}-horizontal-top-text` }>
            {favorite.type === 'comida' ? `${favorite.area} - ${favorite.category}`
              : favorite.alcoholicOrNot }
          </p>
          <Link to={ () => recipeLink(favorite.type, favorite.id) }>
            <h3 data-testid={ `${index}-horizontal-name` }>{favorite.name}</h3>
          </Link>
        </div>
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
};
