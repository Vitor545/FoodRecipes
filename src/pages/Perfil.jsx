import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Perfil() {
  const email = (localStorage.getItem('user'));
  return (
    <div>
      <div className='explorar-recipes'>
        <Link className='explorar-recipes-recipes' to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link className='explorar-recipes-recipes' to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
