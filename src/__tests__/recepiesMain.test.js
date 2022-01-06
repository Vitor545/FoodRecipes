import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';
import FoodCard from '../components/FoodCard';

describe('', () => {
  it('Verifica se a Tela principal, apresenta os 12 Cards', () => {
    renderWithRouterAndProvider(<FoodCard />);

    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      
    }

    const NUMBER_CARDS = 12;
    const cardItem = screen.getAllByTestId('');
    expect(cardItem).toContain(NUMBER_CARDS);
  });
});
