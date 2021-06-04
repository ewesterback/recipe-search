import React, { Component } from 'react'

export default class RecipeCard extends Component {
  render() {
    const { recipe, fromPage } = this.props

    return (
      <div
        className="recipe-card"
        onClick={() => {
          this.props.selectRecipe(recipe, fromPage)
          this.props.showRecipe(recipe)
        }}
      >
        <div className="recipe-card-image">
          <img src={recipe.image} alt={recipe.name} />
        </div>
        <h2>{recipe.name}</h2>
        <h3>
          {recipe.cuisine.name} | {recipe.mainIngredient.name}
        </h3>
        <h4>Total Time: {recipe.time} minutes</h4>
        <p>{recipe.description}</p>
      </div>
    )
  }
}
