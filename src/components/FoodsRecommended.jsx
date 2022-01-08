import React, { useContext } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { RecipesContext } from '../contexts/RecipesContext';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

export default function FoodsRecommended() {
  const { foodRecom } = useContext(RecipesContext);
  return (
    <Splide
      options={ {
        rewind: true,
        gap: '1rem',
        perPage: 2,
      } }
    >
      {foodRecom.filter((el, i) => i < Number('6')).map((obj, index) => (
        <SplideSlide key={ index } data-testid={ `${index}-recomendation-card` }>
          <div data-testid={ `${index}-recomendation-title` }>{obj.strDrink}</div>
          <img src={ obj.strDrinkThumb } alt=" 1" />
        </SplideSlide>
      ))}
    </Splide>
  );
}
