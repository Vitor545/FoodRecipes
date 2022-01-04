import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';
import Login from '../pages/LoginPage';
import App from '../App';
// testsIds
const testIdPerfilBtn = 'profile-top-btn';
const testIdSearchBtn = 'search-top-btn';

describe('testa componente Header', () => {
  it('Verifica se o header não está presente na tela de Login', () => {
    renderWithRouterAndProvider(<Login />);
    const profileBtn = screen.queryByTestId(testIdPerfilBtn);
    const searchBtn = screen.queryByTestId(testIdSearchBtn);

    expect(profileBtn).not.toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('verifica se a página de perfil tem os ícones corretos', () => {
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/perfil');
    const perfilTitle = screen.getByRole('heading', { name: /perfil/i });
    const perfilBtn = screen.getByTestId(testIdPerfilBtn);
    const searchBtn = screen.queryByTestId(testIdSearchBtn);

    expect(perfilTitle).toBeDefined();
    expect(perfilBtn).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('Verifica se o header aparece corretamente na tela de comidas', () => {
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/comidas');
    const perfilBtn = screen.getByTestId(testIdPerfilBtn);
    const searchBtn = screen.getByTestId(testIdSearchBtn);

    expect(perfilBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('Verifica se o header aparece corretamente na tela explorar', () => {
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/explorar');
    const perfilBtn = screen.getByTestId(testIdPerfilBtn);
    const searchBtn = screen.queryByTestId(testIdSearchBtn);

    expect(perfilBtn).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('Verifica se o header aparece na tela explorar comidas e bebidas', () => {
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/explorar/comidas');
    const perfilBtn = screen.getByTestId(testIdPerfilBtn);
    const searchBtn = screen.queryByTestId(testIdSearchBtn);

    expect(perfilBtn).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    history.push('/explorar/comidas');
    expect(perfilBtn).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('Verifica se o header aparece na tela de ingredientes de comidas/bebidas', () => {
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/explorar/comidas/ingredientes');
    const perfilBtn = screen.getByTestId(testIdPerfilBtn);
    const searchBtn = screen.queryByTestId(testIdSearchBtn);

    expect(perfilBtn).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    history.push('/explorar/bebidas/ingredientes');
    expect(perfilBtn).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('Verifica se o header aparece na tela explorar comidas por area', () => {
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/explorar/comidas/area');
    const perfilBtn = screen.getByTestId(testIdPerfilBtn);
    const searchBtn = screen.getByTestId(testIdSearchBtn);

    expect(perfilBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('Verifica se o header não aparece na tela de detalhes de bebidas e comidas', () => {
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/comidas/:id');
    const perfilBtn = screen.queryByTestId(testIdPerfilBtn);
    const searchBtn = screen.queryByTestId(testIdSearchBtn);

    expect(perfilBtn).not.toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();

    history.push('/bebidas/:id');

    expect(perfilBtn).not.toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('Verifica se o header não aparece na tela de receitas feitas e favoritas', () => {
    const { history } = renderWithRouterAndProvider(<App />);
    history.push('/receitas-feitas');
    const perfilBtn = screen.getByTestId(testIdPerfilBtn);
    const searchBtn = screen.queryByTestId(testIdSearchBtn);

    expect(perfilBtn).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();

    history.push('/receitas-favoritas');

    expect(perfilBtn).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });
});
