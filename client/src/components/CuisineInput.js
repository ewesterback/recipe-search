import React, { Component } from 'react'
import ApiClient from '../globals'
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react'

export default class CuisineInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      searchQuery: ''
    }
  }
  handleChange = async (e, data) => {
    this.setState({ searchQuery: data.value })
    console.log(data.value)
    const res = await ApiClient.get(
      `/search/cuisines?searchQuery=${data.value}`
    )
    this.setState({
      results: res.data.map((data) => ({ ...data, title: data.name }))
    })
  }
  resultRenderer = (data) => {
    return <li>{data.name}</li>
  }
  updateSelectedValue = (e, data) => {
    this.props.getSearchResult(e, data)
    this.setState({ searchQuery: this.props.selectedCuisine })
  }
  render() {
    return (
      <Search
        onResultSelect={this.updateSelectedValue}
        onSearchChange={this.handleChange}
        results={this.state.results}
        value={this.state.searchQuery}
        resultRenderer={this.resultRenderer}
      />
    )
  }
}
