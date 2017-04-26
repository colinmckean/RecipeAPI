

var app = function(){
  document.getElementById("addInstruction")
  .addEventListener("click", () => {
    var instructions = document.querySelector('#instructions')
    var instruction = document.createElement('input');
    instruction.type="text";
    instruction.name="instructions";
    instruction.className +=" form-control";
    instruction.placeholder="instruction";
  instructions.appendChild(instruction)},
    false);

  document.getElementById("addIngredient")
  .addEventListener("click", () => {
    var ingredients = document.querySelector('#ingredients')
    var ingredient = document.createElement('input');
    ingredient.type="text";
    ingredient.name="ingredients";
    ingredient.className +=" form-control";
    ingredient.placeholder="ingredient";
    ingredients.appendChild(ingredient);
}, false);
};

window.onload = app;
