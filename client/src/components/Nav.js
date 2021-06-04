import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/browse">
          Browse
        </NavLink>
        <NavLink className="nav-link" to="/add-recipe">
          Add Recipe
        </NavLink>
      </nav>
    )
  }
}
