import React, { Component } from 'react'
import ApiClient from '../globals'
import { Input, Button } from 'semantic-ui-react'

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
          <Input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
            placeholder="Main Ingredient"
            className="ui input"
          />
          <button type="submit" className="ui button">
            Add Main Ingredient
          </button>
        </form>
      </div>
    )
  }
}
