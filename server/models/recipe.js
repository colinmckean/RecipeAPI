var mongoose = require('mongoose');

var Recipe = mongoose.model('Recipe', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  instructions: {
    type: Array,
    // required: true,
    trim: true
  },
  imageURL: {
    type: String,
    //required: true
    trim: true
  },
  ingredients: {
    type: Array,
    // required: true
  },
  cookingTime:{
    type: Number
  }
});

// {title: "Ham & Egg Cups".
// instructions: "1. Preheat oven to 350F degrees. Spray a muffin tin with nonstick cooking spray.2. Place individual ham slices over each muffin cup and gently press down in the middle until a cup shape forms. 3. In the bottom of each ham cup, add in about a tablespoon of shredded cheddar cheese. 4. In a medium bowl, whisk eggs together. 5. Stir in sliced green onions and salt and pepper, to taste.6. Add a couple of tablespoons of the egg mixture into each of the ham cups. Place muffin tin in the oven and bake for about 20-25 minutes. 8. When done, use a fork to gently remove each ham cup and serve.",
// ingredients: ["10 large Eggland's Best® Eggs",
// "1 pound ham; sliced",
// "1 cup shredded cheddar cheese",
// "1/2 cup green onions; sliced",
// "salt and pepper to taste",
// "Original recipe makes 12 Servings"]
// ,
// cookingTime: (30 * 1000 * 60)}
//some ideas, would like an ingredientsAPI, that holds all types of ingredients.
//recipe also holds details of who posted recipe




// {title: "Grilled Cheese Deluxe",
// instructions: "1. Spread each slice of bread on both sides with softened butter. // 2. Arrange four slices in large skillet or electric flat grill, and cook over medium heat until light golden brown, 2 to 3 minutes. Flip over. 3. Layer 1 slice mozzarella, 1 slice provolone, 4 slices NatureSweet® Jubilees™ tomatoes, 2 basil leaves, salt and pepper. 4. Top the sandwich with second slice of buttered bread, flip again. Cook for 2 or 3 more minutes until golden brown on both sides. 5. Remove from grill, and allow to rest for 1 minute before slicing.",
// "cookingTime": 900000,
// ingredients: [4 NatureSweet® Jubilees™ tomatoes; thinly sliced
// 8 thick slices white bread (Texas toast or similar)
// 8 tablespoons unsalted butter; softened
// 4 slices mozzarella cheese
// 4 slices provolone cheese
// 8 fresh basil leaves
// salt and pepper to taste
// Original recipe makes 4 Servings]

// }


module.exports = {Recipe}

//this is some of the fields from bigoven
// {
//   "RecipeID": 0,
//   "Title": "string",
//   "Description": "string",
//   "Cuisine": "string",
//   "Category": "string",
//   "Subcategory": "string",
//   "Microcategory": "string",
//   "PrimaryIngredient": "string",
//   "StarRating": 0,
//   "WebURL": "string",
//   "ImageURL": "string",
//   "ReviewCount": 0,
//   "MedalCount": 0,
//   "FavoriteCount": 0,
//   "Poster": {
//     "UserID": 0,
//     "UserName": "string",
//     "ImageURL48": "string",
//     "PhotoUrl": "string",
//     "IsPremium": true,
//     "IsKitchenHelper": true,
//     "PremiumExpiryDate": "2017-04-22T08:50:38.036Z",
//     "MemberSince": "2017-04-22T08:50:38.036Z",
//     "IsUsingRecurly": true,
//     "FirstName": "string",
//     "LastName": "string"
//   },
//   "Ingredients": [
//     {
//       "IngredientID": 0,
//       "DisplayIndex": 0,
//       "IsHeading": true,
//       "Name": "string",
//       "HTMLName": "string",
//       "Quantity": 0,
//       "DisplayQuantity": "string",
//       "Unit": "string",
//       "MetricQuantity": 0,
//       "MetricDisplayQuantity": "string",
//       "MetricUnit": "string",
//       "PreparationNotes": "string",
//       "IngredientInfo": {
//         "Name": "string",
//         "Department": "string",
//         "MasterIngredientID": 0,
//         "UsuallyOnHand": true
//       },
//       "IsLinked": true
//     }
//   ],
//   "Instructions": "string",
//   "YieldNumber": 0,
//   "YieldUnit": "string",
//   "TotalMinutes": 0,
//   "ActiveMinutes": 0,
//   "NutritionInfo": {
//     "SingularYieldUnit": "string",
//     "TotalCalories": 0,
//     "TotalFat": 0,
//     "CaloriesFromFat": 0,
//     "TotalFatPct": 0,
//     "SatFat": 0,
//     "SatFatPct": 0,
//     "MonoFat": 0,
//     "PolyFat": 0,
//     "TransFat": 0,
//     "Cholesterol": 0,
//     "CholesterolPct": 0,
//     "Sodium": 0,
//     "SodiumPct": 0,
//     "Potassium": 0,
//     "PotassiumPct": 0,
//     "TotalCarbs": 0,
//     "TotalCarbsPct": 0,
//     "DietaryFiber": 0,
//     "DietaryFiberPct": 0,
//     "Sugar": 0,
//     "Protein": 0,
//     "ProteinPct": 0
//   },
//   "IsPrivate": true,
//**   "CreationDate": "2017-04-22T08:50:38.036Z",
//**   "LastModified": "2017-04-22T08:50:38.036Z",
//   "IsBookmark": true,
//   "BookmarkURL": "string",
//   "BookmarkSiteLogo": "string",
//   "BookmarkImageURL": "string",
//   "IsRecipeScan": true,
//   "MenuCount": 0,
//   "NotesCount": 0,
//   "AdTags": "string",
//   "IngredientsTextBlock": "string",
//   "AllCategoriesText": "string",
//   "IsSponsored": true,
//   "VariantOfRecipeID": 0,
//   "Collection": "string",
//   "CollectionID": 0,
//   "AdminBoost": 0,
//   "VerifiedDateTime": "2017-04-22T08:50:38.036Z",
//   "MaxImageSquare": 0,
//   "ImageSquares": [
//     0
//   ],
//   "PhotoUrl": "string",
//   "VerifiedByClass": "string"
// }
