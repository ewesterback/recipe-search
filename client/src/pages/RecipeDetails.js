import React, { Component } from 'react'
import ApiClient from '../globals'

export default class RecipeDetails extends Component {
  deleteRecipe = async () => {
    let recipeID = this.props.selectedRecipes._id
    try {
      const deleted = await ApiClient.delete(`/recipes/${recipeID}`)
    } catch (error) {
      throw error
    }
    console.log(this.props.currentPage)
    this.props.history.push(`${this.props.currentPage}`)
  }
  render() {
    const recipe = this.props.selectedRecipes
    console.log('in details')
    console.log(recipe)
    return recipe ? (
      <div>
        <button className="delete" onClick={this.deleteRecipe}>
          Delete
        </button>
        <img src={recipe.image} alt={recipe.name} />
        <h2 className="recipe-name">{recipe.name}</h2>
        <h4 className="recipe-description">{recipe.description}</h4>
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
