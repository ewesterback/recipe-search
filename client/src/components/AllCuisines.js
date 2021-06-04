import React, { Component } from 'react'
import ApiClient from '../globals'

export default class AllCuisines extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cuisines: []
    }
  }
  async componentDidMount() {
    const res = await ApiClient.get('/cuisines')
    this.setState({ cuisines: res.data.cuisines })
  }
  render() {
    return (
      <div className="cuisine-list">
        {this.state.cuisines.map((cuisine, index) => (
          <li key={index}>{cuisine.name}</li>
        ))}
      </div>
    )
  }
}
