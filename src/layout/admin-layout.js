import "./main-layout.scss"
import "./admin-layout.scss"

import React from "react"

import { EventAdminProvider } from "context/admin-context"
import { useLayout } from "context/layout-context"
import AdminAddPlayerPage from "pages/admin-add-player-page"
import AdminEditFormatPage from "pages/admin-edit-format-page"
import AdminEditPortalPage from "pages/admin-edit-portal-page"
import AdminEditRegistrationPage from "pages/admin-edit-registration-page"
import AdminManageEventDocumentsPage from "pages/admin-manage-event-documents-page"
import AdminManagePlayersPage from "pages/admin-manage-players-page"
import AdminScoresPage from "pages/admin-scores-page"
import AdminSlpPage from "pages/admin-slp-page"
import EventAdminPage from "pages/event-admin-page"
import EventReportPage from "pages/event-report-page"
import { NotFoundScreen } from "pages/not-found"
import PaymentReportPage from "pages/payment-report-page"
import SkinsReportPage from "pages/skins-report-page"
import { UnfinishedPage } from "pages/unfinished-page"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { AdminHeader } from "./admin-header"
import { AdminSidebar } from "./admin-sidebar"

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/event/:eventId" element={<EventAdminPage />} />
      <Route path="/event/:eventId/event-report" element={<EventReportPage />} />
      <Route path="/event/:eventId/payment-report" element={<PaymentReportPage />} />
      <Route path="/event/:eventId/skins-report" element={<SkinsReportPage />} />
      <Route path="/event/:eventId/add-player" element={<AdminAddPlayerPage />} />
      <Route path="/event/:eventId/manage-players" element={<AdminManagePlayersPage />} />
      <Route
        path="/event/:eventId/manage-players/:registrationId"
        element={<AdminEditRegistrationPage />}
      />
      <Route path="/event/:eventId/event-portal" element={<AdminEditPortalPage />} />
      <Route path="/event/:eventId/manage-documents" element={<AdminManageEventDocumentsPage />} />
      <Route path="/event/:eventId/import-points" element={<AdminSlpPage />} />
      <Route path="/event/:eventId/import-scores" element={<AdminScoresPage />} />
      <Route path="/event/:eventId/edit-event" element={<AdminEditFormatPage />} />
      <Route path="/event/:eventId/clone-event" element={<UnfinishedPage />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

function AdminLayout() {
  const { sidebarOpen, closeSidebar } = useLayout()

  return (
    <main className="main" data-ma-theme="teal">
      <ToastContainer autoClose={3000} hideProgressBar={true} newestOnTop={true} />
      <EventAdminProvider>
        <AdminHeader />
        <AdminSidebar />
        <section className="content">
          <AdminRoutes />
          {sidebarOpen && <div onClick={closeSidebar} className="sidebar-backdrop"></div>}
        </section>
      </EventAdminProvider>
    </main>
  )
}

export default AdminLayout
