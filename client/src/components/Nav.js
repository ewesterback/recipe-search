import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/browse">Browse</NavLink>
          <NavLink to="/add-recipe">Add Recipe</NavLink>
        </div>
      </nav>
    )
  }
}
