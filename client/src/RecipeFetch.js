export default class RecipeFetch {
  constructor() {
    this.recipe = '';
  }

  fetchRandom(callback, query='recipes/random') {
    // const url = `.....=${this.query}`;

    const url = `http://localhost:3000/${query}`
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => {
      var recipe = JSON.parse(xhr.responseText);
      // console.log(xhr.responseText)
      this.recipe = recipe;
      console.log(this.recipe);
      callback(recipe);
    };
    xhr.send();
  }
}
