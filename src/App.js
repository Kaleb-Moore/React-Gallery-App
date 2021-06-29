// React libraries and components
import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"
import axios from "axios"
// API key
import apiKey from "./config"
// App Components
import SearchForm from "./components/SearchForm"
import Nav from "./components/Nav"
import PhotoContainer from "./components/PhotoContainer"
import NotFound from "./components/NotFound"

class App extends Component {
  constructor() {
    super()
    this.state = {
      photos: [],
      moon: [],
      forest: [],
      bridge: [],
      searchInput: "",
    }
  }

  // Load default pictures from Flickr API
  componentDidMount() {
    const defaultLinks = ["moon", "forest", "bridge"]
    defaultLinks.map((link) => this.performSearch(link, false))
  }

  // Fetch data from Flickr API using default or search input
  performSearch = (query, isNewData) => {
    const api_key = apiKey
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        isNewData
          ? this.setState({
              photos: response.data.photos.photo,
              searchInput: query,
            })
          : this.setState({
              [query]: response.data.photos.photo,
            })
      })
      .catch((error) => {
        console.error("Error fetching and parsing data", error)
      })
  }

  render() {
    return (
      <Router>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Nav />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/moon" />} />
            <Route
              path="/moon"
              render={() => <PhotoContainer data={this.state.moon} />}
            />
            <Route
              path="/forest"
              render={() => <PhotoContainer data={this.state.forest} />}
            />
            <Route
              path="/bridge"
              render={() => <PhotoContainer data={this.state.bridge} />}
            />
            <Route
              path="/search/:query"
              render={({ match }) => (
                <PhotoContainer
                  query={match.params.query}
                  data={this.state.photos}
                  searchValue={this.state.searchInput}
                  fetchData={this.performSearch}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
