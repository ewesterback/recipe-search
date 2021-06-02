import React, { Component } from 'react'

export default class Search extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={this.props.value}
          onChange={this.props.onChange}
          name="cuisine"
        />
        <input
          type="text"
          placeholder="Search"
          value={this.props.value}
          onChange={this.props.onChange}
          name="ingredient"
        />
        <button>Search</button>
      </form>
    )
  }
}
