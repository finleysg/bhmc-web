import "./main-layout.scss"

import React from "react"

import { useLayout } from "context/layout-context"
import { useRegistrationStatus } from "hooks/account-hooks"
import { ToastContainer } from "react-toastify"
import * as config from "utils/app-config"

import BoundedRoutes from "./bounded-routes"
import { Footer } from "./footer"
import { Header } from "./header"
import { Sidebar } from "./sidebar"

function MainLayout() {
  const { sidebarOpen, closeSidebar } = useLayout()
  const isMember = useRegistrationStatus(config.seasonEventId)
  const themeColor = isMember ? "green" : "blue"

  return (
    <main className="main" data-ma-theme={themeColor}>
      <ToastContainer autoClose={3000} hideProgressBar={true} newestOnTop={true} />
      <Header />
      <Sidebar />
      <section className="content">
        <BoundedRoutes />
        <Footer />
        {sidebarOpen && <div onClick={closeSidebar} className="sidebar-backdrop"></div>}
      </section>
    </main>
  )
}

export default MainLayout
