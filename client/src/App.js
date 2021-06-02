import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ApiClient from './globals'
import './App.css'

import Nav from './components/Nav'
import Home from './pages/Home'
import RecipeDetails from './pages/RecipeDetails'
import BrowseRecipes from './pages/BrowseRecipes'

class App extends Component {
  constructor() {
    super()
    this.state = {
      recipes: [],
      selectedRecipe: null
    }
  }
  async componentDidMount() {
    const res = await ApiClient.get('/recipes')
    console.log(res)
    this.setState({ recipes: res.data.recipes })
  }
  selectRecipe = (recipe) => {
    console.log('hi')
    console.log(recipe)
    this.setState({ selectedRecipes: recipe })
  }
  render() {
    return (
      <div className="App">
        <header>
          <Nav />
        </header>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route
            exact
            path="/browse"
            component={(props) => (
              <BrowseRecipes
                {...props}
                recipes={this.state.recipes}
                selectedRecipes={this.state.selectedRecipes}
                selectRecipe={this.selectRecipe}
              />
            )}
          />
          <Route
            exact
            path="/recipes/:id"
            component={(props) => (
              <RecipeDetails
                {...props}
                selectedRecipes={this.state.selectedRecipes}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default App
