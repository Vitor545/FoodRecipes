import React from 'react';
import { screen } from '@testing-library/react';
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
    const submitBtn = screen.getByTestId(/login-submit-btn/i);

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

    let password = 'teste';
    const MIN_LENGTH = 7;

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, password);
    expect(submitBtn).toBeDisabled();

    userEvent.type(emailInput, 'test@test.com');
    password = 'teste12';
    userEvent.type(passwordInput, password);
    expect(password).toHaveLength(MIN_LENGTH);
    expect(submitBtn).not.toBeDisabled();
  });
});
