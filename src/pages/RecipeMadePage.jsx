import React from 'react';
// import { allUrls } from '../fetchApi/fetchApi';

export default function RecipeMadePage() {
  // const [foodMeals, setfoodMeals] = useState([]);
  // const allUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  // useEffect(() => {
  //   fetch(allUrl)
  //     .then((response) => response.json())
  //     .then((data) => setfoodMeals(data.meals));
  // });

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {
        // foodMeals.slice(0, 11).map((food, index) => (
        //   <FoodMadeCard index={ index } key={ food.idMeal } food={ food.idMeal } />
        // ))
      }
    </div>
  );
}
