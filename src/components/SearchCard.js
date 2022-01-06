import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';
import Footer from './Footer';

const locationName = document.location.pathname;
const ARRAY_12 = 12;

const SearchDrinks = () => {
  const { valueClickSearch, foodName, foodIng, foodLetter, drinkIng, drinkLetter,
    drinkName } = useContext(RecipesContext);

  const criaCardBebidas = (array) => {
    const arrayFilter = array.filter((obj, index) => {
      if (index < ARRAY_12) {
        return obj;
      }
      return null;
    });
    return (
      arrayFilter.map((obj, index) => (
        <div key={ obj.idDrink } className="card-drink">
          <img
            src={ obj.strDrinkThumb }
            className="drink-teste"
            alt=""
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>
            {obj.strDrink}

          </h3>
          <p
            data-testid={ `${index}-recipe-card` }
          >
            {obj.strInstructions}
          </p>
        </div>
      ))
    );
  };

  const criaCardComidas = (array) => {
    const arrayFilter = array.filter((obj, index) => {
      if (index < ARRAY_12) { return obj; }
      return null;
    });
    return (
      arrayFilter.map((obj, index) => (
        <div key={ obj.idMeal } className="card-drink">
          <img
            src={ obj.strMealThumb }
            className="drink-teste"
            alt=""
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>{obj.strMeal}</h3>
          <p
            data-testid={ `${index}-recipe-card` }
          >
            {obj.strInstructions}
          </p>
        </div>
      ))
    );
  };

  const caseBebidas = (tipo) => {
    if (tipo === 'ingrediente') return criaCardBebidas(drinkIng);
    if (tipo === 'nome') return criaCardBebidas(drinkName);
    if (tipo === 'letra') return criaCardBebidas(drinkLetter);
  };

  const caseComidas = (tipo) => {
    if (tipo === 'ingrediente') return criaCardComidas(foodIng);
    if (tipo === 'nome') return criaCardComidas(foodName);
    if (tipo === 'letra') return criaCardComidas(foodLetter);
  };
  const searchBusca = (barra) => {
    if (barra === '/bebidas') {
      switch (valueClickSearch) {
      case 'ingredient':
        return (caseBebidas('ingrediente'));
      case 'name':
        return (caseBebidas('nome'));
      case 'first-letter':
        return (caseBebidas('letra'));
      default:
        return (<div>ERROR</div>);
      }
    }
    if (barra === '/comidas') {
      switch (valueClickSearch) {
      case 'ingredient':
        return (caseComidas('ingrediente'));
      case 'name':
        return (caseComidas('nome'));
      case 'first-letter':
        return (caseComidas('letra'));
      default:
        return (<div>ERROR</div>);
      }
    }
  };

  return (
    <div>
      {searchBusca(locationName)}
      <Footer />
    </div>
  );
};

export default SearchDrinks;
