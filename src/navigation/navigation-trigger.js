import "./navigation-trigger.scss"

function NavigationTrigger({ sidebarOpen, onSidebarToggle }) {
  const triggerClass = () => {
    return `navigation-trigger hidden-xl-up ${sidebarOpen ? "toggled" : ""}`
  }

  return (
    <div className={triggerClass()} onClick={onSidebarToggle}>
      <div className="navigation-trigger__inner">
        <i className="navigation-trigger__line"></i>
        <i className="navigation-trigger__line"></i>
        <i className="navigation-trigger__line"></i>
      </div>
    </div>
  )
}

export { NavigationTrigger }
