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
          <h3>{recipe.cuisine.name}</h3>
          <h3>{recipe.mainIngredient.name}</h3>
          <p className="time">Total Time: {recipe.time} minutes</p>
        </div>
        <div className="recipe-details-content">
          <ul className="ingredientlist">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
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
