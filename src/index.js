import "./bootstrap"

import * as Sentry from "@sentry/react"

import React, { Suspense } from "react"
import ReactDOM from "react-dom"

import { FullPageSpinner } from "components/spinners"
import { AppProviders } from "context"
import { enableMapSet } from "immer"
import AuthLayout from "layout/auth-layout"
import MainLayout from "layout/main-layout"
import { Route, Routes } from "react-router-dom"
import * as config from "utils/app-config"

const AdminLayout = React.lazy(() => import("./layout/admin-layout"))

// import reportWebVitals from "./reportWebVitals"
if (config.currentEnvironment !== "development") {
  Sentry.init({
    dsn: config.sentryApiKey,
    autoSessionTracking: true,
    tracesSampleRate: 0.0,
    release: "bhmc-web@" + process.env.npm_package_version,
  })
}

enableMapSet()

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <Suspense fallback={<FullPageSpinner />}>
        <Routes>
          <Route path="*" element={<MainLayout />} />
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="session/*" element={<AuthLayout />} />
        </Routes>
      </Suspense>
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
