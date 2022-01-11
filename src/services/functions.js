// const renderIngredients = () => {
//   // Pegando todas as chaves de foodDetails que contenham Ingredient no nome
//   const ingr = Object.keys(foodDetails[0])
//     .filter((key) => key.includes('Ingredient'));
//   const measure = Object.keys(foodDetails[0])
//     .filter((key) => key.includes('Measure'));
//   // Fazendo um map pelas chaves e pegando os valores dessas chaves em foodDetails
//   const values = ingr.map((ingredient) => foodDetails[0][ingredient])
//     .filter((el) => el !== '');
//   const valuesMeasure = measure.map((qty) => foodDetails[0][qty])
//     .filter((el) => el !== '');
//   return (
//     values.map((ing, i) => (
//       <li
//         key={ i }
//         data-testid={ `${i}-ingredient-name-and-measure` }
//       >
//         {`${ing} - ${valuesMeasure[i]}`}
//       </li>
//     ))
//   );
// };
