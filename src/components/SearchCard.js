import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';
import { useLocation } from 'react-router';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const ARRAY_12 = 12;

const SearchDrinks = () => {
  const { pathname } = useLocation();
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
      <div className="card-container-conteuds"> 
    {    arrayFilter.map((obj, index) => (
          <Link to={ `/bebidas/${obj.idDrink}` } key={ obj.idDrink } className="card">
            <img
              src={ obj.strDrinkThumb }
              className="drink-teste"
              alt=""
              data-testid={ `${index}-card-img` }
            />
            <h3 data-testid={ `${index}-card-name` }>
              {obj.strDrink}

            </h3>
          </Link>
        ))}
      </div>
    );
  };

  const criaCardComidas = (array) => {
    const arrayFilter = array.filter((obj, index) => {
      if (index < ARRAY_12) { return obj; }
      return null;
    });
    return (
      <div className="card-container-conteuds"> 
        { arrayFilter.map((obj, index) => (
              <Link to={ `/comidas/${obj.idMeal}` } key={ obj.idMeal } className="card">
                <img
                  src={ obj.strMealThumb }
                  className="drink-teste"
                  alt=""
                  data-testid={ `${index}-card-img` }
                />
                <h3 data-testid={ `${index}-card-name` }>{obj.strMeal}</h3>
              </Link>
            ))}
      </div>

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
      {searchBusca(pathname)}
      <Footer />
    </div>
  );
};

export default SearchDrinks;
