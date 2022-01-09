// Chaves para o Local Storage
const mealsToken = 1;
const cocktailsToken = 1;
const user = { email: '' };
const doneRecipes = [{
  id: '',
  type: '',
  area: '',
  category: '',
  alcoholicOrNot: '',
  name: '',
  image: '',
  doneDate: '',
  tags: '',
}];
// const favoriteRecipes = [{
//   id: '',
//   type: '',
//   area: '',
//   category: '',
//   alcoholicOrNot: '',
//   name: '',
//   image: '',
// }];
// Salvando chaves no Local Storage
localStorage.setItem('mealsToken', mealsToken);
localStorage.setItem('cocktailsToken', cocktailsToken);
localStorage.setItem('user', JSON.stringify(user));
localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
// localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
