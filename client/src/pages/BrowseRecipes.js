import React, { Component } from 'react'
import RecipeCard from '../components/RecipeCard'
import ApiClient from '../globals'

export default class BrowseRecipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: this.props.recipes
    }
  }
  async componentDidMount() {
    const res = await ApiClient.get('/recipes')
    console.log(res)
    this.setState({ recipes: res.data.recipes })
  }
  showRecipe = (recipe) => {
    this.props.history.push(`/recipes/${recipe._id}`)
  }

  render() {
    const recipeLists = this.state.recipes.map((recipe, index) => {
      return (
        <RecipeCard
          key={index}
          showRecipe={this.showRecipe}
          selectRecipe={this.props.selectRecipe}
          selectedRecipes={this.props.selectedRecipes}
          recipe={recipe}
          fromPage={'/browse'}
        />
      )
    })
    return <div className="recipes">{recipeLists}</div>
  }
}
