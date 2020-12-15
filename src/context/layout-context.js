import React from "react"

const LayoutContext = React.createContext()
LayoutContext.displayName = "LayoutContext"

function LayoutProvider(props) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  const closeSidebar = () => {
    if (window.innerWidth < 1200) {
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
