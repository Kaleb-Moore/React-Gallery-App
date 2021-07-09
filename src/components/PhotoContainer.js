import React, { Component } from "react"
import Photo from "./Photo"
import NoMatches from "./NoMatches"

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

    if (results.length === 0) {
      return <NoMatches />
    } else {
      return (
        <div className="photo-container">
          <h2>
            {this.props.category
              ? `Results for: ${this.props.category}`
              : `Results for: ${this.props.query}`}
          </h2>
          <ul>{photos}</ul>
        </div>
      )
    }
  }
}

export default PhotoContainer
