import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import React from "react"

import { ReactQueryConfigProvider } from "react-query"
import { BrowserRouter as Router } from "react-router-dom"
import * as config from "utils/app-config"

import { AuthProvider } from "./auth-context"
import { LayoutProvider } from "./layout-context"
import { EventRegistrationProvider } from "./registration-context"

const queryConfig = {
  queries: {
    // useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false
      else if (failureCount < 2) return true
      else return false
    },
  },
}

const stripePromise = loadStripe(config.stripePublicKey)

function AppProviders({ children }) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <LayoutProvider>
        <Router>
          <AuthProvider>
            <EventRegistrationProvider>
              <Elements stripe={stripePromise}>{children}</Elements>
            </EventRegistrationProvider>
          </AuthProvider>
        </Router>
      </LayoutProvider>
    </ReactQueryConfigProvider>
  )
}

export { AppProviders }
