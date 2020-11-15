import "./main-layout.scss"

import React from "react"

import { Route, Routes } from "react-router-dom"
import CalendarScreen from "screens/calendar/calendar-screen"
import { NotFoundScreen } from "screens/not-found"
import { TestingScreen } from "screens/testing"

import { Footer } from "./footer"
import { Header } from "./header"
import { Sidebar } from "./sidebar"

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TestingScreen />} />
      <Route path="/home" element={<TestingScreen />} />
      <Route path="/calendar/:year/:monthName" element={<CalendarScreen />} />
      <Route path="/results" element={<TestingScreen />} />
      <Route path="/policies" element={<TestingScreen />} />
      <Route path="/match-play" element={<TestingScreen />} />
      <Route path="/season-long-points" element={<TestingScreen />} />
      <Route path="/dam-cup" element={<TestingScreen />} />
      <Route path="/directory" element={<TestingScreen />} />
      <Route path="/contact-us" element={<TestingScreen />} />
      <Route path="/about-us" element={<TestingScreen />} />
      <Route path="/sign-up" element={<TestingScreen />} />
      <Route path="/my-account" element={<TestingScreen />} />
      <Route path="/settings" element={<TestingScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  return (
    <main className="main" data-ma-theme="blue">
      <Header sidebarOpen={sidebarOpen} onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} />
      <section className="content">
        <MainRoutes />
        <Footer />
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="sidebar-backdrop"></div>}
      </section>
    </main>
  )
}

export default MainLayout
