import React, { useContext } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { RecipesContext } from '../contexts/RecipesContext';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

export default function DrinksRecommended() {
  const { drinkDetails } = useContext(RecipesContext);
  return (
    <Splide
      options={ {
        rewind: true,
        gap: '1rem',
        perPage: 2,

      } }
    >
      <SplideSlide>
        <img src="https://garagem360.com.br/wp-content/uploads/2021/08/ALTA20-1.jpeg" alt=" 1" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUw8YgGgDIffvTTiIB4VCtRkTIV1sF7brzBw&usqp=CAU" alt=" 2" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg" alt=" 3" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://garagem360.com.br/wp-content/uploads/2021/08/ALTA20-1.jpeg" alt=" 1" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg" alt=" 3" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUw8YgGgDIffvTTiIB4VCtRkTIV1sF7brzBw&usqp=CAU" alt=" 2" />
      </SplideSlide>
    </Splide>
  );
}
