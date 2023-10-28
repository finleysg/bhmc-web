import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { BrowserRouter as Router } from "react-router-dom"
import * as config from "utils/app-config"

import { AuthProvider } from "./auth-context"
import { LayoutProvider } from "./layout-context"
import { EventRegistrationProvider } from "./registration-context"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // query options
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error === '{"detail":"Authentication credentials were not provided."}') return false
        else if (error.status === 404) return false
        else if (failureCount < 2) return true
        else return false
      },
    },
    mutations: {
      // mutation options
      //   useErrorBoundary: true,
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export { AppProviders }
