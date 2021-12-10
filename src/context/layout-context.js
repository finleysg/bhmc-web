import React from "react"

import { isExtraLarge } from "styles/media-queries"
import { useEventListener } from "utils/use-event-listener"

const LayoutContext = React.createContext()
LayoutContext.displayName = "LayoutContext"

function LayoutProvider(props) {
  const [sidebarOpen, setSidebarOpen] = React.useState(isExtraLarge() ? true : false)

  const resizeHandler = React.useCallback((event) => {
    if (event.target.innerWidth >= 1200) {
      setSidebarOpen(true)
    }
  }, [])

  useEventListener("resize", resizeHandler)

  const closeSidebar = () => {
    if (!isExtraLarge()) {
      setSidebarOpen(false)
    }
  }

  const openSidebar = () => {
    setSidebarOpen(true)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const value = {
    sidebarOpen,
    closeSidebar,
    openSidebar,
    toggleSidebar,
  }

  return <LayoutContext.Provider value={value} {...props} />
}

function useLayout() {
  const context = React.useContext(LayoutContext)
  if (context === undefined) {
    throw new Error(`useLayout must be used within a LayoutProvider`)
  }
  return context
}

export { LayoutProvider, useLayout }
