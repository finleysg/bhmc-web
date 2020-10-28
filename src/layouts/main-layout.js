import React from "react"

import { useLayout } from "layouts/useLayout"
import { Footer } from "navigation/footer"
import { Header } from "navigation/header"
import { Sidebar } from "navigation/sidebar"
import { Route, Routes } from "react-router-dom"
import { NotFoundScreen } from "screens/not-found"
import { TestingScreen } from "screens/testing"

function MainLayout() {
  const [showSidebar, setShowSidebar] = useLayout()

  function MainRoutes() {
    return (
      <Routes>
        <Route path="/" element={<TestingScreen />} />
        <Route path="/home" element={<TestingScreen />} />
        <Route path="/calendar" element={<TestingScreen />} />
        <Route path="/results" element={<TestingScreen />} />
        <Route path="/policies" element={<TestingScreen />} />
        <Route path="/match-play" element={<TestingScreen />} />
        <Route path="/season-long-points" element={<TestingScreen />} />
        <Route path="/dam-cup" element={<TestingScreen />} />
        <Route path="/directory" element={<TestingScreen />} />
        <Route path="/contact-us" element={<TestingScreen />} />
        <Route path="/about-us" element={<TestingScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    )
  }

  return (
    <main className="main" data-ma-theme="blue">
      <Header />
      <Sidebar />
      <section className="content">
        <MainRoutes />
        <Footer />
        <div onClick={() => setShowSidebar(!showSidebar)} className="sidebar-backdrop"></div>
      </section>
    </main>
  )
}

export default MainLayout
