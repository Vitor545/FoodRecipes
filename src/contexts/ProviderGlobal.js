import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from './Provider';
import { urlIBebidas, urlNameBebidas, urlPBebidas, urlIs, urlNames, urlPs, allUrls,
  allUrlsCocks }
  from '../fetchApi/fetchApi';

// Source https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
const locationName = document.location.pathname;

function ProviderGlobal({ children }) {
  const [handleClickState, setHandleClickState] = useState('tudo');
  const [handleChangeState, setHandleChangeState] = useState('');
  const [saveMealsIngredientState, setSaveMealsIngredientState] = useState([]);
  const [saveMealsNameState, setSaveMealsNameState] = useState([]);
  const [saveMealsLetterState, setSaveMealsLetterState] = useState([]);
  const [saveCockIngredientState, setSaveCockIngredientState] = useState([]);
  const [saveCockNameState, setSaveCockNameState] = useState([]);
  const [saveCockLetterState, setSaveCockLetterState] = useState([]);
  const [saveCockAllState, setSaveCockAllState] = useState([]);
  const [saveMealAllState, setSaveMealAllState] = useState([]);
  const history = useHistory();

  const caseIngredient = async () => {
    if (locationName === '/bebidas') {
      await setSaveCockIngredientState(await urlIBebidas(handleChangeState));
      if (saveCockIngredientState.length === 1) {
        return history.push(`/bebidas/${saveCockIngredientState
          .map((obj) => obj.idDrink)}`);
      }
    } else {
      await setSaveMealsIngredientState(await urlIs(handleChangeState));
      if (saveMealsIngredientState.length === 1) {
        return history.push(`/comidas/${saveMealsIngredientState
          .map((obj) => obj.idMeal)}`);
      }
    }
  };

  const caseName = async () => {
    if (locationName === '/bebidas') {
      await setSaveCockNameState(await urlNameBebidas(handleChangeState));
      if (saveCockNameState.length === 1) {
        return history.push(`/bebidas/${saveCockNameState.map((obj) => obj.idDrink)}`);
      }
    } else {
      return setSaveMealsNameState(await urlNames(handleChangeState));
    }
  };

  if (saveMealsNameState.length === 1) {
    return history.push(`/comidas/${saveMealsNameState.map((obj) => obj.idMeal)}`);
  }

  const caseLetter = async () => {
    if (handleChangeState.length !== 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (locationName === '/bebidas') {
      await setSaveCockLetterState(await urlPBebidas(handleChangeState));
      if (saveCockLetterState.length === 1) {
        return history.push(`/bebidas/${saveCockLetterState.map((obj) => obj.idDrink)}`);
      }
    } else {
      await setSaveMealsLetterState(await urlPs(handleChangeState));
      if (saveMealsLetterState.length === 1) {
        return history.push(`/comidas/${saveMealsLetterState.map((obj) => obj.idMeal)}`);
      }
    }
  };

  const onClickButton = () => {
    switch (handleClickState) {
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
        setSaveCockAllState(allUrlsCocks());
      }
      setSaveMealAllState(allUrls());
    }
  };

  const handleClick = ({ target: { value } }) => {
    setHandleClickState(value);
  };

  const handleChange = ({ target: { value } }) => {
    setHandleChangeState(value);
  };

  const onClickButtonTeste = () => {
    console.log(saveMealsNameState);
  };

  const contextValues = {
    saveMealsIngredientState,
    saveMealsNameState,
    saveMealsLetterState,
    saveCockIngredientState,
    saveCockNameState,
    saveCockLetterState,
    saveCockAllState,
    saveMealAllState,
    onClickButton,
    onClickButtonTeste,
    handleClick,
    handleChange,
  };

  return (
    <Context.Provider value={ contextValues }>
      {children}
    </Context.Provider>
  );
}

ProviderGlobal.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default ProviderGlobal;
