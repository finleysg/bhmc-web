import "./bootstrap"

import React from "react"
import ReactDOM from "react-dom"

import { AppProviders } from "context"
import { Route, Routes } from "react-router-dom"

import AuthLayout from "./layout/auth-layout"
import MainLayout from "./layout/main-layout"

// import reportWebVitals from "./reportWebVitals"

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <Routes>
        <Route path="*" element={<MainLayout />} />
        <Route path="session/*" element={<AuthLayout />} />
      </Routes>
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
