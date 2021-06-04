import React, { Component } from 'react'
import ApiClient from '../globals'

export default class AllIngreds extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingreds: []
    }
  }
  async componentDidMount() {
    const res = await ApiClient.get('/ingredients')
    this.setState({ ingreds: res.data.ingredients })
  }
  render() {
    return (
      <div className="cuisine-list">
        {this.state.ingreds.map((ingred, index) => (
          <li key={index}>{ingred.name}</li>
        ))}
      </div>
    )
  }
}
