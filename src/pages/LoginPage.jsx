import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { RecipesContext } from '../contexts/RecipesContext';
import imgHam from "../images/hamburger-phone.png"

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
    <div className="login-page">
      <div></div>
      <span className="login-login">
        <h2>Login</h2>
        <form onSubmit={ onSubmit }>
          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              value={ email }
              onChange={ handleChange }
              type="email"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              id='password'
              name="password"
              value={ password }
              onChange={ handleChange }
              type="password"
              data-testid="password-input"
            />
          </label>
          <button
            type="submit"
            disabled={ isSubmitButtonDisabled() }
            data-testid="login-submit-btn"
          >
            Entrar
          </button>

        </form>
      </span>
    </div>

  );
}

export default Login;
