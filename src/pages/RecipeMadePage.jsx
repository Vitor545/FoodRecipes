import React, { useEffect, useState } from 'react';
import FoodMadeCard from '../components/FoodMadeCard';
import { allUrls } from '../fetchApi/fetchApi';

export default function RecipeMadePage() {
  const [foodMeals, setfoodMeals] = useState([]);
  const allUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    fetch(allUrl)
      .then((response) => response.json())
      .then((data) => setfoodMeals(data.meals));
  });

  return (
    <div>
      {
        foodMeals.slice(0, 11).map((food, index) => (
          <FoodMadeCard index={ index } key={ food.idMeal } food={ food.idMeal } />
        ))
      }
    </div>
  );
}
