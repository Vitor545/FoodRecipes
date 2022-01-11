const builtObj = (arr) => {
  const objToLocal = {
    id: arr[0].idDrink || arr[0].idMeal,
    type: arr[0].idDrink ? 'bebida' : 'comida',
    area: arr[0].idMeal ? arr[0].strArea : '',
    category: arr[0].strCategory,
    alcoholicOrNot: arr[0].idDrink ? arr[0].strAlcoholic : '',
    name: arr[0].strDrink || arr[0].strMeal,
    image: arr[0].strDrinkThumb || arr[0].strMealThumb,
  };
  return objToLocal;
};

export default builtObj;
