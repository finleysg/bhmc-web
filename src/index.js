import "./bootstrap"

import React from "react"
import ReactDOM from "react-dom"

import { BrowserRouter } from "react-router-dom"

import MainLayout from "./layouts/main-layout"

// import reportWebVitals from "./reportWebVitals"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainLayout />
      {/* <Routes>
        <Route path="/login" render={(props) => <AuthLayout {...props} />} />
                <Route path="/register" render={(props) => <AuthLayout {...props} />} /> 
        <Route path="/" element={<MainLayout />} />
        <Navigate from="/" exact={true} to="/home" />
      </Routes>*/}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
