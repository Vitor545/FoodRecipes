export const updateLocalFood = (list, id) => {
  const newInfoFromLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (newInfoFromLocal && list) {
    newInfoFromLocal.meals = { ...newInfoFromLocal.meals, [id]: list };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInfoFromLocal));
  }
};

export const updateLocalDrink = (list, id) => {
  const newInfoFromLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (newInfoFromLocal && list) {
    newInfoFromLocal.cocktails = { ...newInfoFromLocal.cocktails, [id]: list };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInfoFromLocal));
  }
};
