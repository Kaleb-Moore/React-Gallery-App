import React from "react"
import { NavLink } from "react-router-dom"

const Nav = () => (
  <nav className="main-nav">
    <ul>
      <li>
        <NavLink to="/moon">Moon</NavLink>
      </li>
      <li>
        <NavLink to="/forest">Forest</NavLink>
      </li>
      <li>
        <NavLink to="/bridge">Bridge</NavLink>
      </li>
    </ul>
  </nav>
)

export default Nav
