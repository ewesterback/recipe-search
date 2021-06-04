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
    this.props.history.push(`${this.props.currentPage}`)
  }
  render() {
    const recipe = this.props.selectedRecipes
    return recipe ? (
      <div className="recipe-grid-container">
        <div className="image-container">
          <img src={recipe.image} alt={recipe.name} />
        </div>
        <div className="recipe-details-header">
          <button className="delete" onClick={this.deleteRecipe}>
            Delete
          </button>

          <h2 className="recipe-name">{recipe.name}</h2>
          <h4 className="recipe-description">{recipe.description}</h4>
          <h3>
            {recipe.cuisine.name} | {recipe.mainIngredient.name}
          </h3>
          <p className="time">Total Time: {recipe.time} minutes</p>
        </div>
        <div className="ingred-section">
          <h3>Ingredients</h3>
          <ul className="ingredientlist">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="instr-section">
          <h3>Instructions</h3>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    ) : null
  }
}
