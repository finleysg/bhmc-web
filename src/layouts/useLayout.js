import React from "react"

function useLayout() {
  const [isMini, setIsMini] = React.useState(false)
  const [showSidebar, setShowSidebar] = React.useState(false)
  return { showSidebar, setShowSidebar, isMini, setIsMini }
}

export { useLayout }
