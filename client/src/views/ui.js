import RecipeFetch from "../RecipeFetch";
import moment from 'moment';
export default class UI{

  constructor() {
    var recipefetch = new RecipeFetch();
    recipefetch.fetchRandom(this.showImage);
    document.getElementById("next")
    .addEventListener("click", () => {recipefetch.fetchRandom(this.showImage)},
      false);
    document.getElementById("show")
    .addEventListener("click", () => {this.showRecipe(recipefetch.recipe)}, false)
  }

  showImage(recipe) {
    var rc = document.querySelector('#recipe-container')
    rc.innerHTML = '';
    var img = document.createElement('img');
    img.src = recipe.recipe.imageURL
    rc.appendChild(img);
  }

  showRecipe(recipe) {
    var rc = document.querySelector('#recipe-container')
    rc.innerHTML = '';
    var h2 = document.createElement('h2');
    var ingredients = document.createElement('ul');
    recipe.recipe.ingredients.forEach((ingredient)=> {
      var li = document.createElement('li')
      li.innerText = ingredient
      ingredients.appendChild(li);
    });

    var instructions = document.createElement('ol');
    recipe.recipe.instructions.forEach((instrction)=> {
      var li = document.createElement('li')
      li.innerText = instrction
      instructions.appendChild(li);
    });

    var cookingTime = document.createElement('p');
    cookingTime.innerText = "Ready in: "+ moment.duration(recipe.recipe.cookingTime).humanize();
    h2.innerText = recipe.recipe.title;
    rc.appendChild(h2);
    rc.appendChild(cookingTime);
    rc.appendChild(ingredients);
    rc.appendChild(instructions);

  }
};
