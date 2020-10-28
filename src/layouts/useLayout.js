import React from "react"

function useLayout() {
  const [showSidebar, setShowSidebar] = React.useState(true)

  return [showSidebar, setShowSidebar]
}

export { useLayout }
