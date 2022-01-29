import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/copo.svg';
import exporeIcon from '../images/bussula.svg';
import mealIcon from '../images/garfo.svg';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <div className="footerBtns">
        <Link to="/bebidas">
          <img
            className="footerImg"
            src={ drinkIcon }
            alt="drink-icon"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/explorar">
          <img
            className="footerImg"
            src={ exporeIcon }
            alt="explore-icon"
            data-testid="explore-bottom-btn"
          />
        </Link>
        <Link to="/comidas">
          <img
            className="footerImg"
            src={ mealIcon }
            alt="food-icon"
            data-testid="food-bottom-btn"
          />
        </Link>
      </div>
    </footer>
  );
}
