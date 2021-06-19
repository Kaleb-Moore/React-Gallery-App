import React, { Component } from "react"
import "./index.css"

import SearchForm from "./components/SearchForm"
import Nav from "./components/Nav"
import PhotoList from "./components/Photo"

class App extends Component {
  constructor() {
    super()
    this.state = {
      photos: [],
    }
  }

  render() {
    return (
      <div className="container">
        <SearchForm />
        <Nav />
        <PhotoList />
      </div>
    )
  }
}

export default App
