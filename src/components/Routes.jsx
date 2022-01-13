import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DrinksPage from '../pages/DrinksPage';
import LoginPage from '../pages/LoginPage';
import ExplorePage from '../pages/ExplorePage';
import FoodPage from '../pages/FoodPage';
import Perfil from '../pages/Perfil';
import FoodExplorePage from '../pages/FoodExplorePage';
import DrinksExplorePage from '../pages/DrinksExplorePage';
import FoodExploreIngredients from '../pages/FoodExploreIngredients';
import DrinksExploreIngrientes from '../pages/DrinksExploreIngrientes';
import ExploreFoodFromOrigin from '../pages/ExploreFoodFromOrigin';
import RecipeMadePage from '../pages/RecipeMadePage';
import FoodId from './FoodId';
import DrinkId from './DrinkId';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import ProgressFood from './ProgressFood';
import ProgressDrink from './ProgressDrink';
import NotFound from '../pages/NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route exact path="/bebidas" component={ DrinksPage } />
      <Route exact path="/bebidas/:id/in-progress" component={ ProgressDrink } />
      <Route exact path="/bebidas/:id" component={ DrinkId } />
      <Route exact path="/explorar" component={ ExplorePage } />
      <Route exact path="/comidas" component={ FoodPage } />
      <Route exact path="/comidas/:id/in-progress" component={ ProgressFood } />
      <Route exact path="/comidas/:id" component={ FoodId } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/explorar/comidas" component={ FoodExplorePage } />
      <Route exact path="/explorar/bebidas" component={ DrinksExplorePage } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ FoodExploreIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinksExploreIngrientes }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodFromOrigin } />
      <Route exact path="/receitas-feitas" component={ RecipeMadePage } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}
