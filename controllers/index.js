const { Recipe, Cuisine, MainIngredient } = require('../models/index')

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate('cuisine')
      .populate('mainIngredient')
    return res.status(200).json({ recipes })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const search = async (req, res) => {
  const cuisines = await Cuisine.find({
    name: { $regex: `^${req.query.searchQuery.toLowerCase()}`, $options: 'i' }
  }).select('name')
  const ingredients = await MainIngredient.find({
    name: { $regex: `^${req.query.searchQuery.toLowerCase()}`, $options: 'i' }
  }).select('name')
  let results = [...cuisines, ...ingredients]
  res.send(results)
}
const cuisineSearch = async (req, res) => {
  const cuisines = await Cuisine.find({
    name: { $regex: `^${req.query.searchQuery.toLowerCase()}`, $options: 'i' }
  }).select('name')
  res.send(cuisines)
}
const ingredSearch = async (req, res) => {
  const ingreds = await MainIngredient.find({
    name: { $regex: `^${req.query.searchQuery.toLowerCase()}`, $options: 'i' }
  }).select('name')
  res.send(ingreds)
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
      .populate('cuisine')
      .populate('mainIngredient')
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
const getCuisineByName = async (req, res) => {
  try {
    const { name } = req.params
    const cuisines = await Cuisine.findOne({ name: name })
    if (cuisines) {
      return res.status(200).json({ cuisines })
    }
    return res.status(404).send('No cuisines exist for that name')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const getIngredByName = async (req, res) => {
  try {
    const { name } = req.params
    const ingred = await MainIngredient.findOne({ name: name })
    if (ingred) {
      return res.status(200).json({ ingred })
    }
    return res.status(404).send('No recipes exist for that Ingredient')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Recipe.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).json({ deleted })
    }
    return res.status(404).send('Recipe not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const listRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({
      $or: [
        { cuisine: req.query.searchTerm },
        { mainIngredient: req.query.searchTerm }
      ]
    })
      .populate('cuisine')
      .populate('mainIngredient')
    res.send(recipes)
  } catch (error) {
    res.send([])
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
  updateIngredient,
  getCuisineByName,
  getIngredByName,
  deleteRecipe,
  search,
  listRecipes,
  cuisineSearch,
  ingredSearch
}
