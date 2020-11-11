import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="footer hidden-xs-down">
      <p>
        Crafted with care by{" "}
        <a href="https://zoomdoggy.com" rel="noreferrer" target="_blank">
          Zoomdoggy Design
        </a>
      </p>

      <ul className="nav footer__nav">
        <Link className="nav-link" to="/home">
          Home
        </Link>

        <Link className="nav-link" to="/contact-us">
          Contact Us
        </Link>

        <Link className="nav-link" to="/about-us">
          About Us
        </Link>
      </ul>
    </footer>
  )
}

export { Footer }
