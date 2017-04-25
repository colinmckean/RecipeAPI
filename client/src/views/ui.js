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

    var rc = document.querySelector('#recipe-container')
    rc.innerHTML = '';
    var img = document.createElement('img');
    img.src = recipe.recipe.imageURL
    img.width = 500;

    rc.appendChild(img);
    // console.log(recipe.recipe.imageURL)
  }

  showRecipe(recipe) {
    var rc = document.querySelector('#recipe-container')
    rc.innerHTML = '';
    var h2 = document.createElement('h2');
    h2.innerText = recipe.recipe.title;
    rc.appendChild(h2);
  }
};
