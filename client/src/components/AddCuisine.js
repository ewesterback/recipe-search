import React, { Component } from 'react'
import ApiClient from '../globals'
import { Input, Button } from 'semantic-ui-react'

export default class AddCuisine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newCuisine = await ApiClient.post(`/cuisines`, this.state)
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
            placeholder="Cuisine"
            className="ui input"
          />
          <button
            type="submit"
            className="ui button"
            disabled={!this.state.name}
          >
            Add Cuisine
          </button>
        </form>
      </div>
    )
  }
}
