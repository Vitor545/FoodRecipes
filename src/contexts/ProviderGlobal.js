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
      const bebidasIn = await urlIBebidas(handleChangeState);
      if (bebidasIn.length === 1) {
        return history.push(`/bebidas/${bebidasIn
          .map((obj) => obj.idDrink)}`);
      }
      return setSaveCockIngredientState(bebidasIn);
    }
    const comidasIn = await urlIs(handleChangeState);
    if (comidasIn.length === 1) {
      return history.push(`/comidas/${comidasIn
        .map((obj) => obj.idMeal)}`);
    }
    return setSaveMealsIngredientState(comidasIn);
  };

  const caseName = async () => {
    if (locationName === '/bebidas') {
      const bebidasName = await urlNameBebidas(handleChangeState);
      if (bebidasName.length === 1) {
        return history.push(`/bebidas/${bebidasName.map((obj) => obj.idDrink)}`);
      }
      return setSaveCockNameState(bebidasName);
    }
    const comidasName = await urlNames(handleChangeState);
    if (comidasName.length === 1) {
      return history.push(`/comidas/${comidasName.map((obj) => obj.idMeal)}`);
    }
    return setSaveMealsNameState(comidasName);
  };

  const caseLetter = async () => {
    if (handleChangeState.length !== 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (locationName === '/bebidas') {
      const bebidasLetter = await urlPBebidas(handleChangeState);
      if (bebidasLetter.length === 1) {
        return history.push(`/bebidas/${bebidasLetter.map((obj) => obj.idDrink)}`);
      }
      return setSaveCockLetterState(bebidasLetter);
    }
    const comidasLetter = await urlPs(handleChangeState);
    if (comidasLetter.length === 1) {
      return history.push(`/comidas/${comidasLetter.map((obj) => obj.idMeal)}`);
    }
    return setSaveMealsLetterState(comidasLetter);
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
