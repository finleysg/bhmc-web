import "./navigation-trigger.scss"

import { useLayout } from "layouts/useLayout"

function NavigationTrigger() {
  const [showSidebar, setShowSidebar] = useLayout()

  const triggerClass = () => {
    return `navigation-trigger hidden-xl-up ${showSidebar ? "toggled" : ""}`
  }
  return (
    <div className={triggerClass()} onClick={() => setShowSidebar(!showSidebar)}>
      <div className="navigation-trigger__inner">
        <i className="navigation-trigger__line"></i>
        <i className="navigation-trigger__line"></i>
        <i className="navigation-trigger__line"></i>
      </div>
    </div>
  )
}

export { NavigationTrigger }
