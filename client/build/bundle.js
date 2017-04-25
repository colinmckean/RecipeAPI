/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class RecipeFetch {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = RecipeFetch;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_ui__ = __webpack_require__(2);


var app = function(){
  new __WEBPACK_IMPORTED_MODULE_0__views_ui__["a" /* default */]();
};

window.onload = app;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RecipeFetch__ = __webpack_require__(0);


class UI{

  constructor() {
    var recipefetch = new __WEBPACK_IMPORTED_MODULE_0__RecipeFetch__["a" /* default */]();
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
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UI;
;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map