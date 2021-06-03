import React, { Component } from 'react'
import ApiClient from '../globals'
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react'

export default class SearchCompletion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      searchQuery: '',
      selectedRecipe: null
    }
  }
  handleChange = async (e, data) => {
    this.setState({ searchQuery: data.value })
    const res = await ApiClient.get(`/search?searchQuery=${data.value}`)
    this.setState({
      results: res.data.map((data) => ({ ...data, title: data.name }))
    })
  }
  resultRenderer = (data) => {
    return <li>{data.name}</li>
  }
  render() {
    return (
      <Search
        onResultSelect={this.props.getSearchResult}
        onSearchChange={this.handleChange}
        results={this.state.results}
        value={this.state.searchQuery}
        resultRenderer={this.resultRenderer}
      />
    )
  }
}
