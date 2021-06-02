const { Router } = require('express')
const controllers = require('../controllers')
const router = Router()

router.get('/', (req, res) => res.send('This is root!'))
router.get('/recipes', controllers.getAllRecipes)
router.post('/recipes', controllers.createRecipe)
router.get('/recipes/:id', controllers.getRecipeById)
router.put('/recipes/:id', controllers.updateRecipe)
router.get('/cuisines', controllers.getAllCuisines)
router.get('/ingredients', controllers.getAllIngredients)
router.put('/cuisines/:id', controllers.updateCuisine)
router.put('/ingredients/:id', controllers.updateIngredient)

module.exports = router
