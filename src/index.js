import "./bootstrap"

import React, { Suspense } from "react"

import { FullPageSpinner } from "components/spinners"
import { AppProviders } from "context"
import { enableMapSet } from "immer"
import AuthLayout from "layout/auth-layout"
import MainLayout from "layout/main-layout"
import { createRoot } from "react-dom/client"
import { Route, Routes } from "react-router-dom"

const AdminLayout = React.lazy(() => import("./layout/admin-layout"))

enableMapSet()

const root = createRoot(document.getElementById("root"))

root.render(
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
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
