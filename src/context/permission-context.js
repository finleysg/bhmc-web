import React from "react"

import { useAuth } from "./auth-context"

const PermissionContext = React.createContext()
PermissionContext.displayName = "PermissionContext"

function PermissionProvider(props) {
  const { user } = useAuth()

  const value = React.useMemo(
    () => ({
      canEdit: user && user.is_authenticated && user.is_staff,
    }),
    [user],
  )

  return <PermissionContext.Provider value={value} {...props} />
}

function usePermission() {
  const context = React.useContext(PermissionContext)
  if (context === undefined) {
    throw new Error(`usePermission must be used within a PermissionProvider`)
  }
  return context
}

export { PermissionProvider as PermissionsProvider, usePermission }
