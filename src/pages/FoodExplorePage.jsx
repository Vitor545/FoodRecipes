import React, { useState, useEffect } from 'react';
import ExploreFromOriginBtn from '../components/ExploreFromOriginBtn';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function FoodExplorePage() {
  const [randomMealId, setRandomMealId] = useState([]);
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => setRandomMealId(data.meals[0].idMeal));
  }, []);

  return (
    <div>

      Food Explore Page
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <ExploreFromOriginBtn />
      <Link to={ `/comidas/${randomMealId}` }>
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
