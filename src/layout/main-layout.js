import "./main-layout.scss"

import React from "react"

import { useAuth } from "context/auth-context"
import { useLayout } from "context/layout-context"
import { useRoutes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { Footer } from "./footer"
import { Header } from "./header"
import { mainRoutes } from "./routes"
import { Sidebar } from "./sidebar"

function MainLayout() {
  const { sidebarOpen, closeSidebar } = useLayout()
  const { user } = useAuth()
  const routing = useRoutes(mainRoutes(user))

  return (
    <main className="main" data-ma-theme="blue">
      <ToastContainer autoClose={3000} hideProgressBar={true} newestOnTop={true} />
      <Header />
      <Sidebar />
      <section className="content">
        {routing}
        <Footer />
        {sidebarOpen && <div onClick={closeSidebar} className="sidebar-backdrop"></div>}
      </section>
    </main>
  )
}

export default MainLayout
