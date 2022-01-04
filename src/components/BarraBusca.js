import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { urlIBebidas, urlNameBebidas, urlPBebidas, urlIs, urlNames, urlPs }
  from '../fetchApi/fetchApi';

function BarraBusca() {
  const [selection, setSelection] = useState('');
  const [digitado, setDigitado] = useState('');
  const [resposta, setResposta] = useState('');
  const { tipo } = useParams();
  const history = useHistory();

  const handleClick = ({ target }) => {
    setSelection(target.id);
  };

  const handleChange = ({ target }) => {
    setDigitado(target.value);
  };

  const fazMapComidas = () => {
    const id = resposta.map((obj) => obj.idMeal);
    return id;
  };

  const fazMapBebidas = () => {
    const id = resposta.map((obj) => obj.idDrink);
    return id;
  };

  const caseComidas = async () => {
    switch (selection) {
    case 'ingredient':
      setResposta(await urlIs(digitado));
      if (resposta.length === Number('1')) {
        history.push(`/comidas/${fazMapComidas()}`);
      }
      console.log(resposta);
      break;
    case 'name':
      setResposta(await urlNames(digitado));
      if (resposta.length === Number('1')) {
        history.push(`/comidas/${fazMapComidas()}`);
      }
      console.log(resposta);
      break;
    case 'first-letter':
      setResposta(await urlPs(digitado));
      if (resposta.length === Number('1')) {
        history.push(`/comidas/${fazMapComidas()}`);
      }
      console.log(resposta);
      break;
    default:
      global.alert('Você não selecionau nenhum parametro');
    }
  };

  const caseBebidas = async () => {
    switch (selection) {
    case 'ingredient':
      setResposta(await urlIBebidas(digitado));
      if (resposta.length === Number('1')) {
        history.push(`/bebidas/${fazMapBebidas()}`);
      }
      console.log(resposta);
      break;
    case 'name':
      setResposta(await urlNameBebidas(digitado));
      if (resposta.length === Number('1')) {
        history.push(`/bebidas/${fazMapBebidas()}`);
      }
      console.log(resposta);
      break;
    case 'first-letter':
      setResposta(await urlPBebidas(digitado));
      if (resposta.length === Number('1')) {
        history.push(`/bebidas/${fazMapBebidas()}`);
      }
      console.log(resposta);
      break;
    default:
      global.alert('Você não selecionau nenhum parametro');
    }
  };

  const onClickButton = () => {
    if (tipo === 'comidas') caseComidas();
    if (tipo === 'bebidas') caseBebidas();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        id="barra-pesquisa"
        onChange={ handleChange }
      />
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          name="select"
          id="ingredient"
          value="ingredient"
          onClick={ handleClick }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          type="radio"
          name="select"
          onClick={ handleClick }
          id="name"
          value="name"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          type="radio"
          name="select"
          value="first-letter"
          onClick={ handleClick }
          id="first-letter"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ onClickButton }
      >
        Busca
      </button>
    </div>
  );
}

export default BarraBusca;
