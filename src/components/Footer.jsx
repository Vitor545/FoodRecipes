import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/RecipesContext';
import drinkIcon from '../images/copo.svg';
import exporeIcon from '../images/bussula.svg';
import mealIcon from '../images/garfo.svg';

export default function Footer() {
  const history = useHistory();
  const { state, setStateGlobal } = useContext(RecipesContext);
  const funcaoDrink = () => {
    setStateGlobal({ ...state, busca: false })
  }
  const funcaoFood = () => {
    setStateGlobal({ ...state, busca: false })
  }
  return (
    <footer data-testid="footer" className="footer">
      <div className="footerBtns" >
        <Link to="/bebidas" onClick={funcaoDrink}>
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
        <Link to="/comidas" onClick={funcaoFood}>
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
