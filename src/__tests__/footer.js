import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';
import FoodPage from '../pages/FoodPage';
import Login from '../pages/LoginPage';
import App from '../App';

describe('Testa componente footer', () => {
  it('Verifica se o footer apresenta os 3 botões', () => {
    renderWithRouterAndProvider(<FoodPage />);
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinkBtn).toBeInTheDocument();

    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    expect(exploreBtn).toBeInTheDocument();

    const foodBtn = screen.getByTestId('food-bottom-btn');
    expect(foodBtn).toBeInTheDocument();
  });

  it('Verifica se o footer apresenta os icones corretos', () => {
    renderWithRouterAndProvider(<FoodPage />);
    const drinkImg = screen.getByAltText('drink-icon');
    expect(drinkImg).toBeInTheDocument();

    const exploreImg = screen.getByAltText('explore-icon');
    expect(exploreImg).toBeInTheDocument();

    const foodImg = screen.getByAltText('food-icon');
    expect(foodImg).toBeInTheDocument();
  });

  it('Verifica se o footer não está presente na página de login', () => {
    renderWithRouterAndProvider(<Login />);
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Verifica se o footer está presente na tela principal de receita de comidas', () => {
    renderWithRouterAndProvider(<Login />);
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/comidas');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Verifica se o footer está presente na tela principal de receita de bebidas', () => {
    renderWithRouterAndProvider(<Login />);
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/bebidas');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Verifica se não tem footer na tela de receita em processo de comida', () => {
    renderWithRouterAndProvider(<Login />);
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/comidas/comida');
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Verifica se não tem footer na tela de receita em processo de bebida', () => {
    renderWithRouterAndProvider(<Login />);
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/bebidas/bebida');
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Verifica se tem footer na tela de explorar', () => {
    renderWithRouterAndProvider(<Login />);
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/explorar');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Verifica se tem footer na tela de explorar comidas', () => {
    renderWithRouterAndProvider(<Login />);
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/explorar/comidas');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Verifica se tem footer na tela de explorar bebidas', () => {
    renderWithRouterAndProvider(<Login />);
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/explorar/bebidas');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Verifica se tem footer na tela de explorar comidas por ingrediente', () => {
    renderWithRouterAndProvider(<Login />);
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/explorar/comidas/ingredientes');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Verifica se tem footer na tela de explorar bebidas por ingrediente', () => {
    renderWithRouterAndProvider(<Login />);
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/explorar/bebidas/ingredientes');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Verifica se tem footer na tela de explorar comidas por local de origem', () => {
    renderWithRouterAndProvider(<Login />);
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/explorar/comidas/area');
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Verifica se não tem footer na tela de receitas feitas', () => {
    renderWithRouterAndProvider(<Login />);
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/receitas-feitas');
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Verifica se não tem footer na tela de receitas favoritas', () => {
    renderWithRouterAndProvider(<Login />);
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/receitas-favoritas');
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });
});
