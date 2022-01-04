// BEBIDAS

export const urlIBebidas = async (digitado) => {
  const urlIBebida = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${digitado}`;
  const response = await fetch(urlIBebida);
  const userData = await response.json();
  return userData;
};

export const urlNameBebidas = async (digitado) => {
  const urlNameBebida = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${digitado}`;
  const response = await fetch(urlNameBebida);
  const userData = await response.json();
  return userData;
};

export const urlPBebidas = async (digitado) => {
  const urlPBebida = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${digitado}`;
  const response = await fetch(urlPBebida);
  const userData = await response.json();
  return userData;
};

// COMIDAS

export const urlIs = async (digitado) => {
  const urlI = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${digitado}`;
  const response = await fetch(urlI);
  const userData = await response.json();
  return userData.meals;
};

export const urlNames = async (digitado) => {
  const urlName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${digitado}`;
  const response = await fetch(urlName);
  const userData = await response.json();
  return userData.meals;
};

export const urlPs = async (digitado) => {
  const urlP = `https://www.themealdb.com/api/json/v1/1/search.php?f=${digitado}`;
  const response = await fetch(urlP);
  const userData = await response.json();
  return userData.meals;
};
