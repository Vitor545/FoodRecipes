import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { urlIBebidas, urlNameBebidas,
  urlPBebidas, urlIs, urlNames, urlPs, allUrls,
  allUrlsCocks }
  from '../fetchApi/fetchApi';

// Source useHistory - https://dev.to/ino_gu/utilizando-usehistory-no-react-bgf

// Source https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
const locationName = document.location.pathname;

const RecipesContext = createContext();

const RecipesProvider = ({ children }) => {
  const [state, setStateGlobal] = useState({
    email: '',
    password: '',
    foodIng: [],
    foodLetter: [],
    foodName: [],
    foodRecipes: [],
    foodRecipesBTN: [],
    drinkRecipes: [],
    saveDrinkRecipes: [],
    drinkRecipesBtns: [],
    drinkIng: [],
    drinkLetter: [],
    drinkName: [],
    drinkAll: [],
    foodAll: [],
    valueInputSearch: '',
    valueClickSearch: '',
    toggle: false,
  });
  const history = useHistory();
  const { email, password,
    valueInputSearch, valueClickSearch,
    foodRecipes, drinkRecipes, drinkRecipesBtns, foodRecipesBTN,
    toggle, saveDrinkRecipes } = state;

  const caseIngredient = async () => {
    if (locationName === '/bebidas') {
      const bebidasIn = await urlIBebidas(valueInputSearch);
      if (bebidasIn.length === 1) {
        return history.push(`/bebidas/${bebidasIn
          .map((obj) => obj.idDrink)}`);
      }
      return setStateGlobal({ ...state, drinkIng: bebidasIn });
    }
    const comidasIn = await urlIs(valueInputSearch);
    if (comidasIn.length === 1) {
      return history.push(`/comidas/${comidasIn
        .map((obj) => obj.idMeal)}`);
    }
    return setStateGlobal({ ...state, foodIng: comidasIn });
  };

  const caseName = async () => {
    if (locationName === '/bebidas') {
      const bebidasName = await urlNameBebidas(valueInputSearch);
      if (bebidasName.length === 1) {
        return history.push(`/bebidas/${bebidasName.map((obj) => obj.idDrink)}`);
      }
      return setStateGlobal({ ...state, drinkName: bebidasName });
    }
    const comidasName = await urlNames(valueInputSearch);
    if (comidasName.length === 1) {
      return history.push(`/comidas/${comidasName.map((obj) => obj.idMeal)}`);
    }
    return setStateGlobal({ ...state, foodName: comidasName });
  };

  const caseLetter = async () => {
    if (valueInputSearch.length !== 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (locationName === '/bebidas') {
      const bebidasLetter = await urlPBebidas(valueInputSearch);
      if (bebidasLetter.length === 1) {
        return history.push(`/bebidas/${bebidasLetter.map((obj) => obj.idDrink)}`);
      }
      return setStateGlobal({ ...state, drinkLetter: bebidasLetter });
    }
    const comidasLetter = await urlPs(valueInputSearch);
    if (comidasLetter.length === 1) {
      return history.push(`/comidas/${comidasLetter.map((obj) => obj.idMeal)}`);
    }
    return setStateGlobal({ ...state, foodLetter: comidasLetter });
  };

  const onClickButtonSearch = async () => {
    switch (valueClickSearch) {
    case 'ingredient':
      caseIngredient();
      break;
    case 'name':
      caseName();
      break;
    case 'first-letter':
      caseLetter();
      break;
    default:
      if (locationName === '/bebidas') {
        const allbebidas = await allUrlsCocks();
        setStateGlobal({ ...state, drinkAll: allbebidas });
      } else {
        const allcomidas = await allUrls();
        setStateGlobal({ ...state, foodAll: allcomidas });
      }
    }
  };

  const handleClickSearch = ({ target: { value } }) => {
    setStateGlobal({ ...state, valueClickSearch: value });
  };

  const handleChangeSearch = ({ target: { value } }) => {
    setStateGlobal({ ...state, valueInputSearch: value });
  };

  const isSubmitButtonDisabled = () => {
    const emailValidation = new RegExp(/[\w]+@+[\w]+[.]+[\w]/);
    const MIN_LENGTH = 6;
    return !(emailValidation.test(email) && password.length > MIN_LENGTH);
  };
  const handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    setStateGlobal({ ...state, [name]: value });
  };

  const context = { state,
    email,
    password,
    foodRecipes,
    drinkRecipes,
    saveDrinkRecipes,
    drinkRecipesBtns,
    toggle,
    handleChange,
    isSubmitButtonDisabled,
    onClickButtonSearch,
    handleClickSearch,
    handleChangeSearch,
    setStateGlobal,
    foodRecipesBTN };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
};

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RecipesContext, RecipesProvider as Provider };
