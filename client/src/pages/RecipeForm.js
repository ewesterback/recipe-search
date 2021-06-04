import React, { Component } from 'react'
import ApiClient from '../globals'
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react'
import AllCuisines from '../components/AllCuisines'
import AllIngred from '../components/AllIngred'
//import CuisineInput from '../components/CuisineInput'

export default class recipeForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      cuisine: '',
      mainIngredient: '',
      image: '',
      ingredients: [],
      instructions: [],
      time: '',
      currentIngredient: '',
      currentInstruction: '',
      cuisineResults: [],
      cuisineSearchQuery: '',
      ingredResults: [],
      ingredSearchQuery: ''
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    this.handleAddInstr()
    this.handleAddIngred()
    //await this.handleCuisine()
    //await this.handleMainIngred()
    await this.addRecipe()
    console.log('submitted')
    this.setState({
      name: '',
      description: '',
      cuisine: '',
      cuisineName: '',
      mainIngredient: '',
      image: '',
      ingredients: [],
      instructions: [],
      time: '',
      currentIngredient: '',
      currentInstruction: '',
      cuisineSearchQuery: '',
      ingredSearchQuery: ''
    })
  }
  addRecipe = async () => {
    let newRecipe
    try {
      const newRecipe = await ApiClient.post(`/recipes`, this.state)
    } catch (error) {
      throw error
    }
    console.log('new recipe')
    console.log(newRecipe)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleAddInstr = () => {
    if (this.state.currentInstruction.length < 1) {
      return
    }
    let list = this.state.instructions
    list.push(this.state.currentInstruction)
    this.setState({
      instructions: list,
      currentInstruction: ''
    })
  }
  handleAddIngred = () => {
    if (this.state.currentIngredient.length < 1) {
      return
    }
    let list = this.state.ingredients
    list.push(this.state.currentIngredient)
    this.setState({
      ingredients: list,
      currentIngredient: ''
    })
  }
  /////////////////////////////////////////////
  getCuisineSearchResults = async (e, data) => {
    e.preventDefault()
    console.log(data)
    console.log(`cusine id = ${data.result._id}`)
    this.setState({
      cuisine: data.result._id,
      cuisineSearchQuery: data.result.name
    })
  }
  handleCuisineChange = async (e, data) => {
    this.setState({ cuisineSearchQuery: data.value })
    console.log(data.value)
    const res = await ApiClient.get(
      `/search/cuisines?searchQuery=${data.value}`
    )
    this.setState({
      cuisineResults: res.data.map((data) => ({ ...data, title: data.name }))
    })
  }
  getIngredSearchResults = async (e, data) => {
    e.preventDefault()
    console.log(data)
    console.log(`mainIngred ID = ${data.result._id}`)
    this.setState({
      mainIngredient: data.result._id,
      ingredSearchQuery: data.result.name
    })
  }
  handleIngredChange = async (e, data) => {
    this.setState({ ingredSearchQuery: data.value })
    console.log(data.value)
    const res = await ApiClient.get(
      `/search/ingredients?searchQuery=${data.value}`
    )
    this.setState({
      ingredResults: res.data.map((data) => ({ ...data, title: data.name }))
    })
  }
  resultRenderer = (data) => {
    return <li>{data.name}</li>
  }

  render() {
    return (
      <div className="new-recipe">
        <div className="recipe-input-form">
          <div className="top-inputs">
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
              placeholder="recipe name"
            />

            <Search
              onResultSelect={this.getIngredSearchResults}
              onSearchChange={this.handleIngredChange}
              results={this.state.ingredResults}
              value={this.state.ingredSearchQuery}
              resultRenderer={this.resultRenderer}
            />
            <Search
              onResultSelect={this.getCuisineSearchResults}
              onSearchChange={this.handleCuisineChange}
              results={this.state.cuisineResults}
              value={this.state.cuisineSearchQuery}
              resultRenderer={this.resultRenderer}
            />
            <input
              type="number"
              value={this.state.time}
              onChange={this.handleChange}
              name="time"
              placeholder="cook time in minutes"
            />
          </div>
          <div className="middle-inputs">
            <input
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
              name="description"
              placeholder="description"
            />
            <input
              type="text"
              value={this.state.image}
              onChange={this.handleChange}
              name="image"
              placeholder="image url"
            />
          </div>
          <div className="bottom-inputs">
            <input
              type="text-area"
              value={this.state.currentIngredient}
              onChange={this.handleChange}
              name="currentIngredient"
              placeholder="ingredients"
            />
            <button className="additional-items" onClick={this.handleAddIngred}>
              Add ingredient
            </button>
            <ul className="form-ingredient-list">
              {this['state']['ingredients'].map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <input
              type="text-area"
              value={this.state.currentInstruction}
              onChange={this.handleChange}
              name="currentInstruction"
              placeholder="instructions"
            />
            <button className="additional-items" onClick={this.handleAddInstr}>
              Add instructions
            </button>
            <ol className="form-instruction-list">
              {this['state']['instructions'].map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          <button className="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
        <div className="recipe-form-cuisine">
          <AllCuisines />
        </div>
        <div className="recipe-form-ingred">
          <AllIngred />
        </div>
      </div>
    )
  }
}
