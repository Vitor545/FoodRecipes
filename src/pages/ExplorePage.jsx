import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import img01 from '../images/img01.jpg';
import img02 from '../images/img02.jpg';

export default function ExplorePage() {
  return (
    <div> 
        <div className="explorar-recipes">
        <Link className="explorar-recipes-recipes" to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link className="explorar-recipes-recipes" to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
  </div>
  );
}
