const db = require('../db')
const { Recipe, Cuisine, MainIngredient } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const createIngred = async () => {
  const ingredArray = [
    {
      name: 'Chicken',
      variations: ['Chicken Breasts', 'Chicken Thighs', 'Eggs']
    },
    {
      name: 'Beef',
      variations: ['Ground beef', 'sirloin']
    }
  ]
  const newIngredArr = ingredArray.map((ingredient) => {
    return new MainIngredient(ingredient)
  })
  await MainIngredient.insertMany(newIngredArr)
  return newIngredArr
}
const createCuisines = async () => {
  let cuisineArr = [
    {
      name: 'Italian',
      recipes: []
    },
    {
      name: 'Asian',
      recipes: []
    }
  ]
  const newCuisineArr = cuisineArr.map((cuisine) => {
    return new Cuisine(cuisine)
  })
  await Cuisine.insertMany(newCuisineArr)
  return newCuisineArr
}

const createRecipe = async (ingredients, cuisines) => {
  let recipesArr = [
    {
      name: 'Spaghetti with Meat Sauce',
      description: 'This easy weeknight meal comes together in 20 minutes',
      cuisine: cuisines.find(({ name }) => name === 'Italian')._id,
      mainIngredient: ingredients.find(({ name }) => name === 'Beef')._id,
      image:
        'https://a7m3f5i5.rocketcdn.me/wp-content/uploads/2015/09/moms-spaghetti-sauce-recipe-a-healthy-slice-of-life-6-of-6-800x600.jpg',
      ingredients: [
        'Spaghetti Noodles',
        'Pasta Sauce',
        'Ground Beef',
        'Parmesan Cheese'
      ],
      instructions: [
        'Brown ground beef over medium heat until done',
        'While beef is cooking, boil noodles according to box instructions',
        'Once beef has cooked, add 1 jar of pasta sauce',
        'Scoop noodles onto plate, add meat sauce over noodles, and top with parmesan cheese'
      ],
      time: 20
    },
    {
      name: 'Sheet Pan Bibimbap',
      description: 'Easy Korean dish with a kaleidoscope of flavors',
      cuisine: cuisines.find(({ name }) => name === 'Asian')._id,
      mainIngredient: ingredients.find(({ name }) => name === 'Chicken')._id,
      image:
        'https://static01.nyt.com/images/2021/05/05/dining/30motherrex1/merlin_187049559_c7503bba-5a56-4ecc-84ab-e212950518b2-articleLarge.jpg',
      ingredients: [
        '6-8oz package of oyster or shitake mushrooms, sliced',
        '1 med sweet potato, peeled and cubed',
        '1 red onion, thinly sliced',
        '1 bunch of tuscan kale, sliced into 1 1/2" pieces',
        '4 eggs',
        'salt and pepper',
        'olive oil',
        'gochujang',
        'siracha',
        'seasame oil',
        'rice'
      ],
      instructions: [
        'Set oven to 425F',
        'Cook 1c in rice cooker',
        'Put mushrooms, sweet potatoe, kale, and onions in a single layer in different quadrants of a sheet pan',
        'Sprinkle generously with olvie oil, season with salt and pepper, and lightly toss with hands',
        'Cook for about 20 minutes until sweet poatoes are done',
        'In the last 5 minutes of cooking, crack eggs onto a non-stick sheet pan and put into oven',
        'Take eggs out just before the whites set.  Take pan out and shake it to see how much the eggs jiggle',
        'In a bowl, layer the rice and veggies, placing the egg on top carefully to avoid breaking the yolk. Top with gochujang, siracha and toasted sesame oil'
      ],
      time: 30
    },
    {
      name: 'Teriyaki Chicken Thighs',
      description:
        'Easy chicken thighs cooked in a cast iron pan.  Goes great with a side of rice and steamed broccoli',
      cuisine: cuisines.find(({ name }) => name === 'Asian')._id,
      mainIngredient: ingredients.find(({ name }) => name === 'Chicken')._id,
      image:
        'https://www.tasteandtellblog.com/wp-content/uploads/2016/08/Cast-Iron-Teriyaki-Chicken-Thighs-tasteandtellblog.com-2.jpg',
      ingredients: [
        '8 bone-in chicken thighs',
        'salt and pepper',
        '1 T veggie oil',
        '1/2 c soy sauce',
        '1/2 c',
        '1/2 c sugar',
        '2 T mirin',
        '1 clove garlic, minced',
        '1 t freshly grated ginger',
        '1/2 t cornstarch',
        '2 green onions'
      ],
      instructions: [
        'Put 12in cast iron skillet on middle oven rack and set oven to 500F',
        'Pat chiken dry and season with salt and pepper',
        'Once oven reaches 500F, remove from oven and place on burner at medium heat. Add veggie oil and heat until it starts smkoing',
        'Place chicken skin side down and place a weighted dutch oven over them.  Cook until skin is crispy (16-20 min)',
        'Flip chicken and cook until skin is brown and crispy and chicken reaches 175F.  Remove from pan',
        'While chicken is cooking, whisk together soy sauce, mirin, garlic, ginger, sugar, and cornstarch',
        'Once chicken is done, pour out the fat from the pan and add mixture.  Bring to simmer over medium heat and cook until it thickens and looks glossy, stirring occasionally',
        'Add chicken back into pan and coat with sauce.  Serve topped with thinly sliced green onions'
      ],
      time: 45
    }
  ]
  const newRecipesArr = recipesArr.map((recipe) => {
    return new Recipe(recipe)
  })
  await Recipe.insertMany(newRecipesArr)
  return newRecipesArr
}

const run = async () => {
  const cuisines = await createCuisines()
  const ingredients = await createIngred()
  const recipes = await createRecipe(ingredients, cuisines)
  //await updateIngredients(recipes)
  db.close()
}

run()
