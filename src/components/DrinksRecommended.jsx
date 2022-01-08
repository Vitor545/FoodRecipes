import React, { useContext } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { RecipesContext } from '../contexts/RecipesContext';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

export default function DrinksRecommended() {
  const { drinkRecipes } = useContext(RecipesContext);
  return (
    <Splide
      options={ {
        rewind: true,
        gap: '1rem',
        perPage: 2,

      } }
    >
      {drinkRecipes.filter((el, i) => i < Number('6')).map((obj, index) => (
        <SplideSlide key={ index }>
          <img src={ obj.strDrinkThumb } alt=" 1" />
          <h5>{obj.strDrink}</h5>
        </SplideSlide>
      ))}
    </Splide>
  );
}
