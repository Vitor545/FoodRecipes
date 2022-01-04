import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { RecipesContext } from '../contexts/RecipesContext';

function Login() {
  const history = useHistory();
  const {
    email,
    password,
    handleChange,
    isSubmitButtonDisabled,
  } = useContext(RecipesContext);
  const onSubmit = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  return (
    <div>
      <form onSubmit={ onSubmit }>
        <input
          name="email"
          value={ email }
          onChange={ handleChange }
          type="email"
          data-testid="email-input"
        />
        <input
          name="password"
          value={ password }
          onChange={ handleChange }
          type="password"
          data-testid="password-input"
        />
        <button
          type="submit"
          disabled={ isSubmitButtonDisabled() }
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </form>
    </div>

  );
}

export default Login;
