import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExploreFromOriginBtn from '../components/ExploreFromOriginBtn';
import Footer from '../components/Footer';

export default function DrinksExplorePage() {
  const [randomDrinkID, setRandomDrinkId] = useState([]);
  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => setRandomDrinkId(data.drinks[0].idDrink));
  }, []);
  return (
    <div>
      Drinks Explore Page
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <ExploreFromOriginBtn />
      <Link to={ `/bebidas/${randomDrinkID}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}
