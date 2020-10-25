import React from "react"

import image from "assets/img/NineWestGreen.jpg"
import { Footer } from "navigation/footer"
import { Header } from "navigation/header"
import { Sidebar } from "navigation/sidebar"
import { Route, Routes } from "react-router-dom"
import { NotFoundScreen } from "screens/not-found"
import { TestingScreen } from "screens/testing"

function MainLayout() {
  //   const { showSidebar, setShowSidebar } = React.useState(false)
  const [isMini, setIsMini] = React.useState(false)
  console.log(`MainLayout says isMini is ${isMini}`)

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
    <div className="wrapper">
      <Sidebar image={image} color="azure" hasImage={true} isMini={isMini} />
      <div className="main-panel">
        <Header color="azure" onSidebarMiniChange={() => setIsMini(!isMini)} />
        <MainRoutes />
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
