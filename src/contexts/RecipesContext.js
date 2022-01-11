import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { urlIBebidas, urlNameBebidas,
  urlPBebidas, urlIs, urlNames, urlPs }
  from '../fetchApi/fetchApi';

// Source useHistory - https://dev.to/ino_gu/utilizando-usehistory-no-react-bgf

// Source https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
const locationName = document.location.pathname;
const messageErro = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

const RecipesContext = createContext();
const RecipesProvider = ({ children }) => {
  const [state, setStateGlobal] = useState({
    email: '',
    password: '',
    foodIng: [],
    foodLetter: [],
    foodName: [],
    foodRecom: [],
    foodRecipes: [],
    foodRecipesBTN: [],
    saveFoodRecipes: [],
    foodAreas: [],
    foodFromAreas: [],
    exploreIngredients: [],
    exploreImgIngredients: [],
    drinkRecipes: [],
    saveDrinkRecipes: [],
    saveDrinkToggle: [],
    drinkDetails: [],
    foodDetails: [],
    drinkRecipesBtns: [],
    drinkIng: [],
    drinkRecom: [],
    drinkLetter: [],
    drinkName: [],
    isStarted: false,
    valueInputSearch: '',
    valueClickSearch: '',
    toggleDrink: '',
    toggleFood: '',
    foodIngrList: [],
    busca: false,
  });

  const history = useHistory();
  const { email, password, valueInputSearch, valueClickSearch,
    foodRecipes, drinkRecipes, drinkRecipesBtns, foodRecipesBTN,
    toggleFood, saveDrinkRecipes, saveFoodRecipes, toggleDrink,
    busca, foodName, drinkDetails, foodIng,
    foodLetter, drinkIng, drinkLetter, drinkName,
    foodDetails, isStarted, foodIngrList, foodRecom, drinkRecom,
    foodAreas, foodFromAreas, exploreIngredients, exploreImgIngredients } = state;

  const caseIngredient = async () => {
    if (locationName === '/bebidas') {
      try {
        const bebidasIn = await urlIBebidas(valueInputSearch);
        if (!bebidasIn) return (global.alert(messageErro));
        if (bebidasIn.length === 1) {
          setStateGlobal({ ...state, drinkIng: bebidasIn });
          return history.push(`/bebidas/${bebidasIn.map((obj) => obj.idDrink)}`);
        }
        return setStateGlobal({ ...state, drinkIng: bebidasIn, busca: true });
      } catch (e) {
        console.log('deu bom');
      }
    } else {
      const comidasIn = await urlIs(valueInputSearch);
      if (comidasIn === null) return (global.alert(messageErro));
      if (comidasIn.length === 1) {
        setStateGlobal({ ...state, foodIng: comidasIn });
        return history.push(`/comidas/${comidasIn.map((obj) => obj.idMeal)}`);
      }
      return setStateGlobal({ ...state, foodIng: comidasIn, busca: true });
    }
  };

  const caseName = async () => {
    if (locationName === '/bebidas') {
      const bebidasName = await urlNameBebidas(valueInputSearch);
      if (bebidasName === null) return (global.alert(messageErro));
      if (bebidasName.length === 1) {
        setStateGlobal({ ...state, drinkName: bebidasName });
        return history.push(`/bebidas/${bebidasName.map((obj) => obj.idDrink)}`);
      }
      setStateGlobal({ ...state, drinkName: bebidasName, busca: true });
    } else {
      const comidasName = await urlNames(valueInputSearch);
      if (comidasName === null) return (global.alert(messageErro));
      if (comidasName.length === 1) {
        setStateGlobal({ ...state, foodName: comidasName });
        return history.push(`/comidas/${comidasName.map((obj) => obj.idMeal)}`);
      }
      return setStateGlobal({ ...state, foodName: comidasName, busca: true });
    }
  };

  const caseLetter = async () => {
    if (valueInputSearch.length !== 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (locationName === '/bebidas') {
      const bebidasLetter = await urlPBebidas(valueInputSearch);
      if (bebidasLetter === null) return (global.alert(messageErro));
      if (bebidasLetter.length === 1) {
        setStateGlobal({ ...state, drinkLetter: bebidasLetter });
        return history.push(`/bebidas/${bebidasLetter.map((obj) => obj.idDrink)}`);
      }
      return setStateGlobal({ ...state, drinkLetter: bebidasLetter, busca: true });
    }
    const comidasLetter = await urlPs(valueInputSearch);
    if (comidasLetter === null) return (global.alert(messageErro));
    if (comidasLetter.length === 1) {
      setStateGlobal({ ...state, foodLetter: comidasLetter });
      return history.push(`/comidas/${comidasLetter.map((obj) => obj.idMeal)}`);
    }
    return setStateGlobal({ ...state, foodLetter: comidasLetter, busca: true });
  };

  const handleChangeSearch = ({ target: { value } }) => {
    setStateGlobal({ ...state, valueInputSearch: value });
  };

  const handleClickSearch = ({ target: { value } }) => {
    setStateGlobal({ ...state, valueClickSearch: value });
  };

  const onClickButtonSearch = async () => {
    switch (valueClickSearch) {
    case 'ingredient':
      await caseIngredient();
      break;
    case 'name':
      await caseName();
      break;
    case 'first-letter':
      await caseLetter();
      break;
    default:
      console.log('Default');
    }
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
    foodRecipesBTN,
    saveFoodRecipes,
    foodAreas,
    foodFromAreas,
    exploreIngredients,
    exploreImgIngredients,
    drinkRecipes,
    saveDrinkRecipes,
    drinkRecipesBtns,
    drinkDetails,
    toggleFood,
    toggleDrink,
    handleChange,
    isSubmitButtonDisabled,
    onClickButtonSearch,
    handleClickSearch,
    handleChangeSearch,
    setStateGlobal,
    foodName,
    valueClickSearch,
    foodIng,
    foodLetter,
    drinkIng,
    drinkLetter,
    drinkName,
    foodDetails,
    isStarted,
    foodIngrList,
    foodRecom,
    drinkRecom,
    busca };

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
