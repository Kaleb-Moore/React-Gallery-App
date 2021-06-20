import React from "react"

const Photo = (props) => {
  return (
    <li>
      <img
        src={`https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}_w.jpg`}
        alt=""
      />
    </li>
  )
}

export default Photo
