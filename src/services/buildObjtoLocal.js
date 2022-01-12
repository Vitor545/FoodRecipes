const builtObj = (arr) => {
  if (arr.id) {
    return {
      id: arr.id,
      type: arr.type,
      area: arr.area,
      category: arr.category,
      alcoholicOrNot: arr.alcoholicOrNot,
      name: arr.name,
      image: arr.image,
    };
  }
  return {
    id: arr[0].idDrink || arr[0].idMeal,
    type: arr[0].idDrink ? 'bebida' : 'comida',
    area: arr[0].idMeal ? arr[0].strArea : '',
    category: arr[0].strCategory,
    alcoholicOrNot: arr[0].idDrink ? arr[0].strAlcoholic : '',
    name: arr[0].strDrink || arr[0].strMeal,
    image: arr[0].strDrinkThumb || arr[0].strMealThumb,
  };
};

export default builtObj;
