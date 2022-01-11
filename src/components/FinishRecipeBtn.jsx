import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function FinishRecipeBtn(props) {
  const [isDisable, setIsDisable] = useState(true);
  const [ingrLength, setIngrLength] = useState(0);
  const locationName = useLocation();
  const { pathname } = locationName;
  const { id } = useParams();

  // useEffect(() => {
  //   const { recipeControl } = props;
  //   const ingr = Object.keys(recipeControl[0])
  //     .filter((key) => key.includes('Ingredient'));
  //   const values = ingr.map((ingredient) => recipeControl[0][ingredient])
  //     .filter((el) => el !== '' && el !== null);
  //   const localLength = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   setIngrLength(localLength);
  //   verification(localLength, values, id);
  // }, []);

  return (
    <button
      className="finish-btn"
      data-testid="finish-recipe-btn"
      type="button"
      disabled={ isDisable }
    >
      Finalizar
    </button>
  );
}
