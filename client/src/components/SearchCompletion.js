import React, { Component } from 'react'
import ApiClient from '../globals'
import { Search, Button } from 'semantic-ui-react'

export default class SearchCompletion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results1: [],
      resultsid1: '',
      searchQuery1: '',
      results2: [],
      resultsid2: '',
      searchQuery2: '',
      selectedRecipe: null
    }
  }
  handleChangeOne = async (e, data) => {
    this.setState({ searchQuery1: data.value })
    const res = await ApiClient.get(`/search?searchQuery=${data.value}`)
    this.setState({
      results1: res.data.map((data) => ({ ...data, title: data.name }))
    })
  }
  handleChangeTwo = async (e, data) => {
    this.setState({ searchQuery2: data.value })
    const res = await ApiClient.get(`/search?searchQuery=${data.value}`)
    this.setState({
      results2: res.data.map((data) => ({ ...data, title: data.name }))
    })
  }
  onResultsSelectOne = (e, data) => {
    e.preventDefault()
    this.setState({
      searchQuery1: data.result.name,
      resultsid1: data.result._id
    })
  }
  onResultsSelectTwo = (e, data) => {
    e.preventDefault()
    this.setState({
      searchQuery2: data.result.name,
      resultsid2: data.result._id
    })
  }
  resultRenderer = (data) => {
    return <li>{data.name}</li>
  }
  findSearchResults = async () => {
    await this.props.getSearchResult(
      this.state.resultsid1,
      this.state.resultsid2
    )
    this.setState({
      results1: [],
      resultsid1: '',
      searchQuery1: '',
      results2: [],
      resultsid2: '',
      searchQuery2: '',
      selectedRecipe: null
    })
  }
  render() {
    return (
      <div className="search-completion">
        <div className="search-ele">
          <Search
            onResultSelect={this.onResultsSelectOne}
            onSearchChange={this.handleChangeOne}
            results={this.state.results1}
            value={this.state.searchQuery1}
            resultRenderer={this.resultRenderer}
          />
        </div>
        <div className="search-ele">
          <Search
            onResultSelect={this.onResultsSelectTwo}
            onSearchChange={this.handleChangeTwo}
            results={this.state.results2}
            value={this.state.searchQuery2}
            resultRenderer={this.resultRenderer}
          />
        </div>
        <div className="search-ele">
          <button className="ui button" onClick={this.findSearchResults}>
            Search
          </button>
        </div>
      </div>
    )
  }
}
