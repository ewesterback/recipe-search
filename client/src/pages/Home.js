import React, { Component } from 'react'

import Search from '../components/Search'
import ApiClient from '../globals'
import RecipeCard from '../components/RecipeCard'
import SearchCompletion from '../components/SearchCompletion'
import AllCuisines from '../components/AllCuisines'
import AllIngreds from '../components/AllIngred'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      cuisine: '',
      ingredient: '',
      searchResults: [],
      searched: false,
      curPage: '/'
    }
  }
  getSearchResults = async (e, data) => {
    e.preventDefault()
    console.log(data)
    const res = await ApiClient.get(
      `/search/recipes?searchTerm=${data.result._id}`
    )
    console.log(res)
    this.setState({ searchResults: res.data, searched: true })
  }
  getAllRecipes = async () => {
    console.log('here')
    const res = await ApiClient.get('/recipes')
    this.setState({ searchResults: res.data.recipes })
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
        <p>
          Finally a way to answer the dreaded question of "What's for dinner
          tonight?" Search for recipes from a specific cuisine, recipes with a
          specific main ingredient, or both!{' '}
        </p>
        <p>
          Add your own recipes by navigating to "Add Recipe" or browse all
          Recipes by navigating to "Browse"
        </p>
        <SearchCompletion getSearchResult={this.getSearchResults} />
        {this.state.searched ? (
          <>
            <h3>Search Results</h3>
            {this.state.searchResults.length > 0 ? (
              <>
                <section className="recipe-search-results">
                  {this.state.searchResults.map((recipe, index) => (
                    <RecipeCard
                      key={index}
                      showRecipe={this.showRecipe}
                      selectRecipe={this.props.selectRecipe}
                      selectedRecipes={this.props.selectedRecipes}
                      fromPage={this.state.curPage}
                      recipe={recipe}
                    />
                  ))}
                </section>
              </>
            ) : (
              <>
                <h4>No recipes found</h4>
              </>
            )}
          </>
        ) : (
          <>
            <h3>Cuisines</h3>
            <AllCuisines />
            <h3>Main Ingredients</h3>
            <AllIngreds />
          </>
        )}
      </div>
    )
  }
}
