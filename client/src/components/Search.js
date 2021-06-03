import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'

export default class Search extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input
          type="text"
          placeholder="Search Cuisine"
          value={this.props.cuisine}
          onChange={this.props.onChange}
          name="cuisine"
        />
        <input
          type="text"
          placeholder="Search Main Ingredient"
          value={this.props.ingredient}
          onChange={this.props.onChange}
          name="ingredient"
        />
        <button>Search</button>
      </form>
    )
  }
}
