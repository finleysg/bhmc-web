import React from "react"

import { useEventAdmin } from "context/admin-context"
import { useLayout } from "context/layout-context"
import { GiGolfFlag } from "react-icons/gi"
import { GoSettings } from "react-icons/go"
import { GrOrderedList } from "react-icons/gr"
import { HiDocumentReport, HiDocumentText } from "react-icons/hi"
import { MdEdit, MdPeopleOutline, MdPersonAdd } from "react-icons/md"
import { TiArrowBackOutline, TiHome } from "react-icons/ti"

import { MenuItem } from "./menu-item"

const ADMIN_BASE = process.env.REACT_APP_ADMIN_URL

function AdminSidebar() {
  const { clubEvent } = useEventAdmin()
  const { sidebarOpen } = useLayout()
  const eventId = clubEvent?.id || 0

  return (
    <aside
      className={sidebarOpen ? "sidebar admin-sidebar--bg toggled" : "sidebar admin-sidebar--bg"}
    >
      <ul className="navigation">
        <MenuItem path="/home" icon={<TiHome />} name="Main Home Page" />
        <MenuItem
          path={clubEvent?.eventUrl ?? ""}
          icon={<TiArrowBackOutline />}
          name="Return to Event Page"
        />
        <MenuItem path={`/admin/event/${eventId}`} icon={<GoSettings />} name="Event Admin Home" />
        <MenuItem
          path={`/admin/event/${eventId}/event-report`}
          icon={<HiDocumentReport />}
          name="Event Report"
        />
        <MenuItem
          path={`/admin/event/${eventId}/payment-report`}
          icon={<HiDocumentReport />}
          name="Payment Report"
        />
        <MenuItem
          path={`/admin/event/${eventId}/skins-report`}
          icon={<HiDocumentReport />}
          name="Skins Report"
        />
        <MenuItem
          path={`/admin/event/${eventId}/add-player`}
          icon={<MdPersonAdd />}
          name="Add Player(s)"
        />
        <MenuItem
          path={`/admin/event/${eventId}/manage-players`}
          icon={<MdPeopleOutline />}
          name="Manage Player(s)"
        />
        <MenuItem
          path={`/admin/event/${eventId}/event-portal`}
          icon={<GiGolfFlag />}
          name="Edit GG Portal"
        />
        <MenuItem
          path={`/admin/event/${eventId}/manage-documents`}
          icon={<HiDocumentText />}
          name="Manage Event Documents"
        />
        <MenuItem
          path={`/admin/event/${eventId}/import-points`}
          icon={<GrOrderedList />}
          name="Import Season Long Points"
        />
        <MenuItem
          path={`/admin/event/${eventId}/edit-event`}
          icon={<MdEdit />}
          name="Edit Event Notes"
        />
        <li>
          <a
            href={`${ADMIN_BASE}/events/event/${eventId}/change/`}
            target="_blank"
            rel="noreferrer"
          >
            Backend Administration Page
          </a>
        </li>
      </ul>
    </aside>
  )
}

export { AdminSidebar }
