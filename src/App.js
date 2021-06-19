// React libraries
import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import axios from "axios"
// CSS styling
import "./index.css"
// API key & secret
import apiKey from "./config"
// Components
import SearchForm from "./components/SearchForm"
import Nav from "./components/Nav"
import PhotoContainer from "./components/PhotoContainer"
import NotFound from "./components/NotFound"

class App extends Component {
  constructor() {
    super()
    this.state = {
      photos: [],
    }
  }

  componentDidMount() {}

  performSearch = (query) => {
    const api_key = apiKey
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        this.setState({
          photos: response.data.photos.photo,
        })
      })
      .catch((error) => {
        console.error("Error fetching and parsing data", error)
      })
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Nav />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <PhotoContainer data={this.state.photos} />}
            />
            <Route
              path="/cats"
              render={() => <PhotoContainer data={this.state.photos} />}
            />
            <Route
              path="/dogs"
              render={() => <PhotoContainer data={this.state.photos} />}
            />
            <Route
              path="/birds"
              render={() => <PhotoContainer data={this.state.photos} />}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
