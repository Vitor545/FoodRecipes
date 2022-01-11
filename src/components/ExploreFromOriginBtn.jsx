import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export default function ExploreFromOriginBtn() {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleClick = () => {
    if (pathname === '/explorar/comidas') {
      history.push('/explorar/comidas/area');
    } else {
      history.push('/explorar/bebeidas/area');
    }
  };

  return (
    <div>
      <button type="button" onClick={ handleClick }>
        Por Origem
      </button>
    </div>
  );
}
