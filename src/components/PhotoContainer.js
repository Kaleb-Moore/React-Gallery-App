import React from "react"
import Photo from "./Photo"

const PhotoContainer = (props) => {
  const results = props.data
  const urls = results.map(
    (photo) =>
      `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`
  )

  const photos = urls.map((url, index) => {
    return <Photo url={url} key={index} />
  })

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>{photos}</ul>
    </div>
  )
}

export default PhotoContainer
