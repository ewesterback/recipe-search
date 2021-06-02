import React, { Component } from 'react'
import Search from '../components/Search'
import ApiClient from '../globals'

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
    const cusineResults = await ApiClient.get(`/cuisine/${this.state.cuisine}`)
    const ingredResults = await ApiClient.get(
      `/ingredient/${this.state.ingredient}`
    )
    const cuisineRecipes = cusineResults.data.recipes.recipes
    const ingredRecipes = ingredResults.data.recipes.recipes
    console.log(cuisineRecipes)
    console.log(ingredRecipes)
    this.setState({
      //   searchResults: res.data.results,
      cuisine: '',
      ingredient: ''
      //   searched: true
    })
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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
      </div>
    )
  }
}
