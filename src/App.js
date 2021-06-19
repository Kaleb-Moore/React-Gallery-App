// React libraries
import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
// CSS styling
import "./index.css"
// API key & secret
import apiKey from "./config"
import secret from "./config"
// Components
import SearchForm from "./components/SearchForm"
import Nav from "./components/Nav"
import PhotoContainer from "./components/Photo"
import NotFound from "./components/NotFound"

class App extends Component {
  constructor() {
    super()
    this.state = {
      photos: [],
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm />
          <Nav />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <PhotoContainer SearchTerm="cats" />}
            />
            <Route
              path="/cats"
              render={() => <PhotoContainer SearchTerm="cats" />}
            />
            <Route
              path="/dogs"
              render={() => <PhotoContainer SearchTerm="dogs" />}
            />
            <Route
              path="/birds"
              render={() => <PhotoContainer SearchTerm="birds" />}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
