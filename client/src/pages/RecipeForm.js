import React, { Component } from 'react'
import ApiClient from '../globals'

export default class recipeForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      cuisine: '',
      image: '',
      ingredients: [],
      instructions: [],
      time: '',
      currentIngredient: '',
      currentInstruction: ''
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    console.log('submitted')
    this.handleAddInstr()
    this.handleAddIngred()
    try {
      const newRecipe = await ApiClient.post(`/recipes`, this.state)
    } catch (error) {
      throw error
    }
    this.setState({
      name: '',
      description: '',
      cuisine: '',
      image: '',
      ingredients: [],
      instructions: [],
      time: '',
      currentIngredient: '',
      currentInstruction: ''
    })
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
            <input
              type="text"
              value={this.state.cuisine}
              onChange={this.handleChange}
              name="cuisine"
              placeholder="cuisine"
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
      </div>
    )
  }
}
