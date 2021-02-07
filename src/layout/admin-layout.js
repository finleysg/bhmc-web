import "./admin-layout.scss"

import React from "react"

import EventAdminPage from "pages/event-admin-page"
import EventReportPage from "pages/event-report-page"
import { NotFoundScreen } from "pages/not-found"
import PaymentReportPage from "pages/payment-report-page"
import { UnfinishedPage } from "pages/unfinished-page"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/event/:eventId" element={<EventAdminPage />} />
      <Route path="/event/:eventId/event-report" element={<EventReportPage />} />
      <Route path="/event/:eventId/payment-report" element={<PaymentReportPage />} />
      <Route path="/event/:eventId/add-player" element={<UnfinishedPage />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

function AdminLayout() {
  return (
    <div className="administration">
      <ToastContainer />
      <div className="admin-screen">
        <AdminRoutes />
      </div>
    </div>
  )
}

export default AdminLayout
