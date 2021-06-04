import React, { Component } from 'react'

export default class RecipeCard extends Component {
  render() {
    console.log(this.props)
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
        <h4>{recipe.description}</h4>
        <h3>{recipe.cuisine.name}</h3>
        <h3>{recipe.mainIngredient.name}</h3>
        <p>Total Time: {recipe.time} minutes</p>
      </div>
    )
  }
}
