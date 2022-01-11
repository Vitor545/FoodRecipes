import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';


function ExploreIngredientsBtn() {
  
 const history = useHistory();
  const { pathname } = useLocation();

  const handleChange = () => {
  if (pathname === '/explorar/comidas') {
    history.push('/explorar/comidas/ingredientes')
  } else {
    history.push('/explorar/bebidas/ingredientes')
  }
  }

  return (
    <div>
      <button className="IngredientsBTN" type="button"
      data-testid="explore-by-ingredient"
      onClick={ handleChange }
      >
        Por Ingredientes
      </button>
    </div>
  )
}

export default ExploreIngredientsBtn
