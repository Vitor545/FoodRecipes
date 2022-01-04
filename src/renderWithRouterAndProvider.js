import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from './contexts/RecipesContext';

const renderWithRouterAndProvider = (
  component, // componente a ser renderizado
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({ // arrow function que retorna um objeto

  // spread do retorno do render { getByTestId, getByRole, etc }
  ...render(
    <Router history={ history }>
      <Provider>
        {component}
      </Provider>
    </Router>,
  ),
  history,
});

export default renderWithRouterAndProvider;
