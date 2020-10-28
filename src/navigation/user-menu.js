import React from "react"

import { Link } from "react-router-dom"

function UserMenu() {
  const [showMenu, setShowMenu] = React.useState(false)

  return (
    <div className="user">
      <div className={showMenu ? "user__info active" : "user__info"} onClick={() => setShowMenu(!showMenu)}>
        <img className="user__img" src="./assets/demo/img/profile-pics/8.jpg" alt="" />
        <div className="user__name">Malinda Hollaway</div>
        <div className="user__email">malinda-h@gmail.com</div>
      </div>

      {showMenu && (
        <div className="user__menu">
          <Link to="">View Profile</Link>
          <Link to="">Settings</Link>
          <Link to="">Logout</Link>
        </div>
      )}
    </div>
  )
}

export { UserMenu }
