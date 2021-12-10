import React, { createContext, useState } from 'react';

const RecipesContext = createContext();

const RecipesProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    // const emailValidation = new RegExp(/[\w]+@+[\w]+[.]+[\w]/);
    if (name === 'email') setEmail(value);
    else setPassword(value);
  };
  const context = { email, password, handleChange };
  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
};

export { RecipesContext, RecipesProvider as Provider };
