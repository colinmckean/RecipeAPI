import RecipeFetch from "../RecipeFetch";

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

  getRecipe(recipe) {

  }

  showImage(recipe) {

    var rc = document.querySelector('#image-container')
    rc.innerHTML = '';
    var img = document.createElement('img');
    img.src = recipe.recipe.imageURL

    rc.appendChild(img);
  }

  showRecipe(recipe) {
    var rc = document.querySelector('#recipe-container')
    rc.innerHTML = '';
    var h2 = document.createElement('h2');
    // var instructions = document.createElement('p');
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
    })
    // instructions.innerText = recipe.recipe.instructions;
    h2.innerText = recipe.recipe.title;




//     1800000
// imageURL
// :
// "images/913bd8e3f499ad8e0c44cc3433475b0c1493127669331.jpeg"
// ingredients
// instructions
// :
//

    rc.appendChild(h2);
    rc.appendChild(ingredients);
    rc.appendChild(instructions);
  }
};
