import React, { Component } from 'react'

import Search from '../components/Search'
import ApiClient from '../globals'
import RecipeCard from '../components/RecipeCard'
import SearchCompletion from '../components/SearchCompletion'
import AllCuisines from '../components/AllCuisines'

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
        <h2>home</h2>
        <button className="delete">Delete</button>
        <SearchCompletion getSearchResult={this.getSearchResults} />
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
                  fromPage={this.state.curPage}
                  recipe={recipe}
                />
              ))}
            </section>
          </>
        ) : (
          <>
            <h3>Cuisines</h3>
            <AllCuisines />
          </>
        )}
      </div>
    )
  }
}
