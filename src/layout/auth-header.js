import { Link } from "react-router-dom"

function AuthHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#toggler"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand" to={"/home"}>
        Bunker Hills Men's Golf Club
      </Link>

      <div className="collapse navbar-collapse" id="toggler">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li>
            <Link to={"/home"} className="nav-link">
              <p>Home</p>
            </Link>
          </li>
          <li className="top-nav--active">
            <Link to={"/session/login"} className="nav-link">
              <p>Login</p>
            </Link>
          </li>
          <li className="">
            <Link to={"/session/account"} className="nav-link">
              <p>Register</p>
            </Link>
          </li>
          <li className="">
            <Link to={"/session/reset-password"} className="nav-link">
              <p>Forget Password</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export { AuthHeader }
