import React, { Component } from 'react'

export default class RecipeDetails extends Component {
  render() {
    const recipe = this.props.selectedRecipes
    console.log('in details')
    console.log(recipe)
    return recipe ? (
      <div>
        <img src={recipe.image} alt={recipe.name} />
        <h2 className="recipename">{recipe.name}</h2>
        <h4 className="recipedescription">{recipe.description}</h4>
        <p className="time">Total Time: {recipe.time} minutes</p>
        <ul className="ingredientlist">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <ul>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    ) : null
  }
}
