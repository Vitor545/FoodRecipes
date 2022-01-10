import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { foodDetailsRequest } from '../fetchApi/fetchApi';

export default function ProgressFood() {
  const { id } = useParams();
  let infoFromLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!infoFromLocal) {
    infoFromLocal = {
      cocktails: {},
      meals: {},
    };
  }
  const gettingFood = async () => {
    const fillFood = await foodDetailsRequest(id);
    console.log(fillFood);
    const ingr = Object.keys(fillFood[0])
      .filter((key) => key.includes('Ingredient'));
    const values = ingr.map((ingredient) => fillFood[0][ingredient])
      .filter((el) => el !== '');
    infoFromLocal.meals = { ...infoFromLocal.meals, [id]: values };
    localStorage.setItem('inProgressRecipes', JSON.stringify(infoFromLocal));
  };

  useEffect(() => {
    gettingFood();
  }, []);

  return (
    <div>
      {id}
    </div>
  );
}
