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
import Error404 from "./components/Error404"

class App extends Component {
  constructor() {
    super()
    this.state = {
      photos: [],
      moon: [],
      forest: [],
      bridge: [],
      searchInput: "",
      loading: true,
    }
  }

  // Load default pictures from Flickr API
  componentDidMount() {
    const defaultLinks = ["moon", "forest", "bridge"]
    defaultLinks.map((link) => this.performSearch(link, false))
  }

  // Fetch data from Flickr API using default or search input
  performSearch = (query, isNewData) => {
    this.setState({ loading: true })
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
              loading: false,
            })
          : this.setState({
              [query]: response.data.photos.photo,
              loading: false,
            })
      })
      .catch((error) => {
        console.error("Error fetching and parsing data", error)
      })
  }

  render() {
    return (
      <Router>
        <div className="container wrapper">
          <SearchForm onSearch={this.performSearch} />
          <Nav />

          {this.state.moon.length *
            this.state.forest.length *
            this.state.bridge.length ===
            0 || this.state.loading ? (
            <h1>Loading...</h1>
          ) : (
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/moon" />} />
              <Route
                path="/moon"
                render={() => (
                  <PhotoContainer category="moon" data={this.state.moon} />
                )}
              />
              <Route
                path="/forest"
                render={() => (
                  <PhotoContainer category="forest" data={this.state.forest} />
                )}
              />
              <Route
                path="/bridge"
                render={() => (
                  <PhotoContainer category="bridge" data={this.state.bridge} />
                )}
              />
              <Route
                path="/search/:query"
                render={({ match }) => (
                  <PhotoContainer
                    query={match.params.query}
                    data={this.state.photos}
                    searchValue={this.state.searchInput}
                    fetchData={this.performSearch}
                    category=""
                  />
                )}
              />
              <Route component={Error404} />
            </Switch>
          )}
        </div>
      </Router>
    )
  }
}

export default App
