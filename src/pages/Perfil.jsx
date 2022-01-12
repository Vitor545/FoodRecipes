import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Perfil() {
  const email = JSON.stringify(localStorage.getItem('user'));
  return (
    <div>
      <h3 data-testid="profile-email">{email}</h3>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}
