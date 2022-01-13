import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';
import FoodPage from '../components/FoodCard';

describe('Testa Recipes Main Page', () => {
  it('Verifica se a Tela principal, apresenta os 12 Cards', () => {
    renderWithRouterAndProvider(<FoodPage />);
    const AMOUNT_OF_RECIPES = 12;
    for (let index = 0; index < AMOUNT_OF_RECIPES; index += 1) {
      const cardElement = screen.getByTestId(`${index}-recipe-card`);
      expect(cardElement).toBeInTheDocument();
    }

    const NUMBER_CARDS = 12;
    const cardItem = screen.getAllByTestId('');
    expect(cardItem).toContain(NUMBER_CARDS);
  });
});
