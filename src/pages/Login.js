import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

function Login() {
  const { email, password } = useContext(RecipesContext);
  return (
    <div>
      <form>
        <input name="email" value={ email } type="email" data-testid="email-input" />
        <input
          name="password"
          value={ password }
          type="password"
          data-testid="password-input"
        />
        <button type="submit" data-testid="login-submit-btn">Entrar</button>
      </form>
    </div>

  );
}

export default Login;
