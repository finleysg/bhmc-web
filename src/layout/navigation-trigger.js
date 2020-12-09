import { useLayout } from "context/layout-context"

function NavigationTrigger() {
  const { sidebarOpen, toggleSidebar } = useLayout()

  const triggerClass = () => {
    return `navigation-trigger hidden-xl-up ${sidebarOpen ? "toggled" : ""}`
  }

  return (
    <div className={triggerClass()} onClick={toggleSidebar}>
      <div className="navigation-trigger__inner">
        <i className="navigation-trigger__line"></i>
        <i className="navigation-trigger__line"></i>
        <i className="navigation-trigger__line"></i>
      </div>
    </div>
  )
}

export { NavigationTrigger }
