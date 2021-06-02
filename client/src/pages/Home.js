import React, { Component } from 'react'
import Search from '../components/Search'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      cuisine: '',
      ingredient: '',
      searchResults: [],
      searched: false
    }
  }
  // getSearchResults = async (e) => {
  //   e.preventDefault()
  //   const res = await axios.get(
  //     `https://api.rawg.io/api/games?search=${this.state.searchQuery}&key=${API_KEY}`
  //   )
  //   this.setState({
  //     searchResults: res.data.results,
  //     searchQuery: '',
  //     searched: true
  //   })
  // }
  // handleChange = (event) => {
  //   this.setState({ searchQuery: event.target.value })
  // }
  render() {
    return (
      <div>
        <h2>home</h2>
        <Search cuisine={this.state.cuisine} />
      </div>
    )
  }
}
