import React from "react"

import image from "assets/img/NineWestGreen.jpg"
import { Footer } from "navigation/footer"
import { Header } from "navigation/header"
import { Sidebar } from "navigation/sidebar"
import { Route, Routes } from "react-router-dom"
import { NotFoundScreen } from "screens/not-found"
import { TestingScreen } from "screens/testing"

function useLayout(initialState) {
  const [showSidebar, setShowSidebar] = React.useState(initialState)
  return [showSidebar, setShowSidebar]
}

function MainLayout() {
  const [showSidebar, setShowSidebar] = useLayout(true)

  function MainRoutes() {
    return (
      <Routes>
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
      <Sidebar image={image} color="black" hasImage={true} mini={!showSidebar} />
      <div className="main-panel">
        <Header color="black" handleMiniClick={() => setShowSidebar(!showSidebar)} />
        <MainRoutes />
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
