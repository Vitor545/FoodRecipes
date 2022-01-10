import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { drinkDetailsRequest } from '../fetchApi/fetchApi';

export default function ProgressDrink() {
  const { id } = useParams();
  let infoFromLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!infoFromLocal) {
    infoFromLocal = {
      cocktails: {},
      meals: {},
    };
  }
  const gettingDrink = async () => {
    const fillDrink = await drinkDetailsRequest(id);
    console.log(fillDrink);
    const ingr = Object.keys(fillDrink[0])
      .filter((key) => key.includes('Ingredient'));
    const values = ingr.map((ingredient) => fillDrink[0][ingredient])
      .filter((el) => el !== null);
    infoFromLocal.cocktails = { ...infoFromLocal.cocktails, [id]: values };
    localStorage.setItem('inProgressRecipes', JSON.stringify(infoFromLocal));
  };

  useEffect(() => {
    gettingDrink();
  }, []);

  return (
    <div>
      {id}
    </div>
  );
}
