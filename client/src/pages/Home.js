import React, { Component } from 'react'

import Search from '../components/Search'
import ApiClient from '../globals'
import RecipeCard from '../components/RecipeCard'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      cuisine: '',
      ingredient: '',
      searchResults: [],
      searched: false
    }
  }
  getSearchResults = async (e) => {
    e.preventDefault()
    this.setState({ searchResults: [] })
    let cuisineRecipes = []
    let ingredRecipes = []
    if (this.state.cuisine.length > 0) {
      const cuisineResults = await ApiClient.get(
        `/cuisine/${this.state.cuisine}`
      )
      console.log(cuisineResults)
      cuisineRecipes = cuisineResults.data.cuisines.recipes
    }
    if (this.state.ingredient.length > 0) {
      const ingredResults = await ApiClient.get(
        `/ingredient/${this.state.ingredient}`
      )
      console.log(ingredResults)
      ingredRecipes = ingredResults.data.ingred.recipes
    }
    let searchResults = []
    if (cuisineRecipes.length < 1) {
      searchResults = ingredRecipes
    } else if (ingredRecipes.length < 1) {
      searchResults = cuisineRecipes
    } else {
      for (let i = 0; i < cuisineRecipes.length; i++) {
        console.log(cuisineRecipes[i])
        if (ingredRecipes.some((arrVal) => cuisineRecipes[i] === arrVal)) {
          searchResults.push(cuisineRecipes[i])
        }
      }
    }

    if (searchResults.length > 0) {
      searchResults.forEach((id) => {
        this.getRecipe(id)
      })
    }
    this.setState({
      cuisine: '',
      ingredient: '',
      searched: true
    })
    console.log('recipe results')
    console.log(this.state.searchResults)
  }
  getRecipe = async (id) => {
    try {
      const res = await ApiClient.get(`/recipes/${id}`)
      let curRecArr = this.state.searchResults
      let newRecArr = [...curRecArr, res.data.recipe]
      this.setState({ searchResults: newRecArr })
    } catch (error) {
      throw error
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  showRecipe = (recipe) => {
    this.props.history.push(`/recipes/${recipe._id}`)
  }
  render() {
    return (
      <div>
        <h2>home</h2>
        <Search
          cuisine={this.state.cuisine}
          ingredient={this.state.ingredient}
          onSubmit={this.getSearchResults}
          onChange={this.handleChange}
        />
        {this.state.searched ? (
          <>
            <h3>Search Results</h3>
            <section className="recipe-search-results">
              {this.state.searchResults.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  showRecipe={this.showRecipe}
                  selectRecipe={this.props.selectRecipe}
                  selectedRecipes={this.props.selectedRecipes}
                  recipe={recipe}
                />
              ))}
            </section>
          </>
        ) : null}
      </div>
    )
  }
}
