const { Recipe, Cuisine, MainIngredient } = require('../models/index')

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
    return res.status(200).json({ recipes })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const getAllCuisines = async (req, res) => {
  try {
    const cuisines = await Cuisine.find()
    return res.status(200).json({ cuisines })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await MainIngredient.find()
    return res.status(200).json({ ingredients })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const createRecipe = async (req, res) => {
  try {
    const recipe = await new Recipe(req.body)
    await recipe.save()
    return res.status(201).json({
      recipe
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params
    const recipe = await Recipe.findById(id)
    if (recipe) {
      return res.status(200).json({ recipe })
    }
    return res.status(404).send('Recipe with the specified ID does not exists')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params
    await Recipe.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
      (err, recipe) => {
        if (err) {
          res.status(500).send(err)
        }
        if (!recipe) {
          res.status(500).send('Recipe not found!')
        }
        return res.status(200).json(recipe)
      }
    )
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const updateCuisine = async (req, res) => {
  try {
    const { id } = req.params
    await Cuisine.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
      (err, cuisine) => {
        if (err) {
          res.status(500).send(err)
        }
        if (!cuisine) {
          res.status(500).send('Cuisine not found!')
        }
        return res.status(200).json(cuisine)
      }
    )
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params
    await MainIngredient.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
      (err, ingredient) => {
        if (err) {
          res.status(500).send(err)
        }
        if (!ingredient) {
          res.status(500).send('Ingredient not found!')
        }
        return res.status(200).json(ingredient)
      }
    )
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
module.exports = {
  getAllRecipes,
  getAllCuisines,
  getAllIngredients,
  createRecipe,
  getRecipeById,
  updateRecipe,
  updateCuisine,
  updateIngredient
}
