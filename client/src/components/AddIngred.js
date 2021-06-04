import React, { Component } from 'react'
import ApiClient from '../globals'

export default class AddIngred extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newIngred = await ApiClient.post(`/ingredients`, this.state)
    } catch (error) {
      throw error
    }
    this.setState({ name: '' })
  }
  handleChange = (e) => {
    this.setState({ name: e.target.value })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
            placeholder="Main Ingredient"
          />
          <button type="submit">Add Main Ingredient</button>
        </form>
      </div>
    )
  }
}
