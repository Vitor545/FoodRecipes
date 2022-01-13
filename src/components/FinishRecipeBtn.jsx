import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function FinishRecipeBtn(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  const [controlList, setControlList] = useState();
  const history = useHistory();
  const { ingredientsControl, recipeControl } = props;

  const checkLength = () => {
    if (ingredientsControl.length === controlList.length) {
      console.log('entrou');
      setIsDisable(false);
    } else {
      console.log('saiu');
      setIsDisable(true);
    }
  };

  useEffect(() => {
    const ingr = Object.keys(recipeControl[0])
      .filter((key) => key.includes('Ingredient'));
    const values = ingr.map((ingredient) => recipeControl[0][ingredient])
      .filter((el) => el !== '' && el !== null);
    setControlList(values);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (controlList) {
      checkLength();
    }
  }, [ingredientsControl]);

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    );
  }
  return (
    <button
      className="finish-btn"
      data-testid="finish-recipe-btn"
      type="button"
      disabled={ isDisable }
      onClick={ () => history.push('/receitas-feitas') }
    >
      Finalizar receita
    </button>
  );
}

FinishRecipeBtn.propTypes = {
  ingredientsControl: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipeControl: PropTypes.arrayOf(PropTypes.string).isRequired,
};
