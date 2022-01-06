// BEBIDAS

export const urlIBebidas = async (digitado) => {
  const urlIBebida = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${digitado}`;
  const response = await fetch(urlIBebida);
  const userData = await response.json();
  return userData.drinks;
};

export const urlNameBebidas = async (digitado) => {
  const urlNameBebida = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${digitado}`;
  const response = await fetch(urlNameBebida);
  const userData = await response.json();
  return userData.drinks;
};

export const urlPBebidas = async (digitado) => {
  const urlPBebida = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${digitado}`;
  const response = await fetch(urlPBebida);
  const userData = await response.json();
  return userData.drinks;
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

export const allUrls = async () => {
  const allUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(allUrl);
  const userData = await response.json();
  return userData.meals;
};

export const allUrlsCocks = async () => {
  const allUrlCock = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(allUrlCock);
  const userData = await response.json();
  return userData.drinks;
};

export const foodRecipesAPI = async () => {
  const urlName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(urlName);
  const userData = await response.json().then((data) => data);
  return userData.meals;
};

export const foodRecipesCategoryAPI = async () => {
  const urlName = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(urlName);
  const userData = await response.json().then((data) => data);
  return userData.meals;
};

export const drinkRecipesAPI = async () => {
  const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const responseRaw = await fetch(urlName);
  const responseJson = await responseRaw.json();
  return responseJson.drinks;
};

export const drinkRecipesCategoryAPI = async () => {
  const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const responseRaw = await fetch(urlName);
  const responseJson = await responseRaw.json();
  return responseJson.drinks;
};

export const fetchFoodCategory = async (digitado) => {
  const urlName = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${digitado}`;
  const responseRaw = await fetch(urlName);
  const responseJson = await responseRaw.json().then((data) => data);
  return responseJson.meals;
};

export const drinkFilterCategory = async (drink) => {
  const urlName = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`;
  const responseRaw = await fetch(urlName);
  const responseJson = await responseRaw.json();
  return responseJson.drinks;
};

export const drinkDetailsRequest = async (id) => {
  const urlName = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const responseRaw = await fetch(urlName);
  const responseJson = await responseRaw.json();
  return responseJson.drinks;
};
