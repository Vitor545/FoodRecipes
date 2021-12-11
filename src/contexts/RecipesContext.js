import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

const RecipesContext = createContext();

const RecipesProvider = ({ children }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = state;
  const isSubmitButtonDisabled = () => {
    const emailValidation = new RegExp(/[\w]+@+[\w]+[.]+[\w]/);
    const MIN_LENGTH = 6;
    console.log(email, password);
    return !(emailValidation.test(email) && password.length > MIN_LENGTH);
  };
  const handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    setState({ ...state, [name]: value });
  };
  const context = { email, password, handleChange, isSubmitButtonDisabled };
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
