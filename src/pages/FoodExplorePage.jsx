import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExploreFromOriginBtn from '../components/ExploreFromOriginBtn';
import ExploreIngredientsBtn from '../components/ExploreIngredientsBtn';
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
      <div className="explorar-recipes">
        <ExploreIngredientsBtn />
        <ExploreFromOriginBtn />
        <Link className="explorar-recipes-recipes" to={ `/comidas/${randomMealId}` }>
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
