import "./main-layout.scss"

import React from "react"

import { useAuth } from "context/auth-context"
import { useLayout } from "context/layout-context"
import { ToastContainer } from "react-toastify"

import BoundedRoutes from "./bounded-routes"
import { Footer } from "./footer"
import { Header } from "./header"
import { Sidebar } from "./sidebar"

function MainLayout() {
  const { sidebarOpen, closeSidebar } = useLayout()
  const { user } = useAuth()
  const themeColor = user?.is_authenticated ? "green" : "blue"

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
