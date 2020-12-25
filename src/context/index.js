import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import React from "react"

import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter as Router } from "react-router-dom"
import * as config from "utils/app-config"

import { AuthProvider } from "./auth-context"
import { LayoutProvider } from "./layout-context"
import { EventRegistrationProvider } from "./registration-context"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // query options
      // useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error.status === 404) return false
        else if (failureCount < 2) return true
        else return false
      },
    },
    mutations: {
      // mutation options
    },
  },
})

const stripePromise = loadStripe(config.stripePublicKey)

function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider>
        <Router>
          <AuthProvider>
            <EventRegistrationProvider>
              <Elements stripe={stripePromise}>{children}</Elements>
            </EventRegistrationProvider>
          </AuthProvider>
        </Router>
      </LayoutProvider>
    </QueryClientProvider>
  )
}

export { AppProviders }
