import { Link, useMatch } from "react-router-dom"

function Tabs({ children }) {
  return (
    <ul className="nav nav-tabs" role="tablist">
      {children}
    </ul>
  )
}

function Tab({ to, children }) {
  const match = useMatch(to)
  return (
    <li className="nav-item">
      <Link
        to={to}
        className={match ? "nav-link active" : "nav-link"}
        role="tab"
        aria-controls={to}
        aria-selected={match}
      >
        {children}
      </Link>
    </li>
  )
}

function IndexTab({ index, selectedIndex, onSelect, children }) {
  const handleSelect = () => {
    if (index !== selectedIndex) {
      onSelect(index)
    }
  }

  return (
    <li className="nav-item">
      <div
        onClick={handleSelect}
        className={index === selectedIndex ? "nav-link active" : "nav-link"}
        role="tab"
        aria-selected={index === selectedIndex}
        style={{ cursor: "pointer" }}
      >
        {children}
      </div>
    </li>
  )
}

export { IndexTab, Tab, Tabs }
