import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';
import Login from '../pages/LoginPage';

describe('Testa Tela de Login', () => {
  it('Verify if login page has all the data test id necessary', () => {
    renderWithRouterAndProvider(<Login />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const submitBtn = screen.getByTestId(/login-submit-btn/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  it('Verify it it is possible to write in the email, and password inputs', () => {
    renderWithRouterAndProvider(<Login />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    userEvent.type(emailInput, 'teste');
    expect(emailInput).toHaveValue('teste');
    userEvent.type(passwordInput, 'teste');
    expect(emailInput).toHaveValue('teste');
  });

  it('Verify if it is a valid email and password', () => {
    renderWithRouterAndProvider(<Login />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const submitBtn = screen.getByTestId(/login-submit-btn/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    let password = 'teste12';
    let email = 'teste.com';
    const MIN_LENGTH = 7;

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    expect(submitBtn).toBeDisabled();

    email = 'teste@teste.com';
    password = 'teste';
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    expect(submitBtn).toBeDisabled();

    userEvent.type(emailInput, email);
    password = 'teste12';
    userEvent.type(passwordInput, password);
    expect(password).toHaveLength(MIN_LENGTH);
    expect(submitBtn).not.toBeDisabled();
  });

  // it('Verify if localStorage has 2 itens with keys mealsToken and cocktailsToken', () => {
  //   beforeEach(() => {
  //     window.localStorage.clear();
  //   });
  //   renderWithRouterAndProvider(<Login />);
  //   const emailInput = screen.getByTestId(/email-input/i);
  //   const passwordInput = screen.getByTestId(/password-input/i);
  //   const submitBtn = screen.getByTestId(/login-submit-btn/i);

  //   let mealsToken = window.localStorage.getItem('mealsToken');
  //   let cocktailsToken = window.localStorage.getItem('cocktailsToken');

  //   expect(mealsToken).toBeNull();
  //   expect(cocktailsToken).toBeNull();

  //   // const password = 'teste12';
  //   // const email = 'teste@teste.com';
  //   // userEvent.type(emailInput, email);
  //   // userEvent.type(passwordInput, password);
  //   // expect(submitBtn).not.toBeDisabled();
  //   // mealsToken = window.localStorage.setItem('mealsToken', 1);
  //   // cocktailsToken = window.localStorage.setItem('cocktailsToken', 1);
  //   // userEvent.click(submitBtn);

  //   // expect(mealsToken).toBe(1);
  //   // expect(cocktailsToken).toBe(1);
  // });
});
