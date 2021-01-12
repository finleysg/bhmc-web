import React from "react"

const useEventListener = (eventName, handler, element = window) => {
  // Create a ref that stores handler
  const savedHandler = React.useRef()

  // Update ref.current value if handler changes.
  // You should memoize the handler with useCallback.
  React.useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  React.useLayoutEffect(
    () => {
      if (!Boolean(savedHandler)) return

      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event)

      // Add event listener
      element.addEventListener(eventName, eventListener)

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    [eventName, element], // Re-run if eventName or element changes
  )
}

export { useEventListener }
