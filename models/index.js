const { model } = require('mongoose')
const RecipeSchema = require('./recipe')
const CuisineSchema = require('./cuisine')
const MainIngredientSchema = require('./mainIngredient')

const Recipe = model('recipes', RecipeSchema)
const Cuisine = model('cuisines', CuisineSchema)
const MainIngredient = model('ingredients', MainIngredientSchema)

module.exports = {
  Recipe,
  Cuisine,
  MainIngredient
}
