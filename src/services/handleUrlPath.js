const handleTitle = (path) => {
  switch (path) {
  case '/perfil':
    return 'Perfil';
  case '/comidas':
    return 'Comidas';
  case '/bebidas':
    return 'Bebidas';
  case '/explorar':
    return 'Explorar';
  case '/explorar/comidas':
    return 'Explorar Comidas';
  case '/explorar/bebidas':
    return 'Explorar Bebidas';
  case '/explorar/comidas/ingredientes':
    return 'Explorar Ingredientes';
  case '/explorar/bebidas/ingredientes':
    return 'Explorar Ingredientes';
  case '/explorar/comidas/area':
    return 'Explorar Origem';
  case '/receitas-feitas':
    return 'Receitas Feitas';
  case '/receitas-favoritas':
    return 'Receitas Favoritas';
  default:
  }
};

export default handleTitle;
