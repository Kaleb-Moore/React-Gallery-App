import React, { Component } from "react"
import Photo from "./Photo"

class PhotoContainer extends Component {
  // Fetch data from flickr API using via URL parameter
  componentDidMount() {
    if (this.props.query && this.props.query !== this.props.searchValue) {
      this.props.fetchData(this.props.query, true)
    }
  }

  render() {
    const results = this.props.data
    const photos = results.map((photo) => (
      <Photo
        server={photo.server}
        secret={photo.secret}
        id={photo.id}
        key={photo.id}
        title={photo.title}
      />
    ))
    return (
      <div className="photo-container">
        <h2>Results</h2>
        <ul>{photos}</ul>
      </div>
    )
  }
}

export default PhotoContainer
