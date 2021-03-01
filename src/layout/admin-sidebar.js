import React from "react"

import { useEventAdmin } from "context/admin-context"
import { useLayout } from "context/layout-context"
import { GiGolfFlag } from "react-icons/gi"
import { GoHome } from "react-icons/go"
import { GrOrderedList } from "react-icons/gr"
import {
  HiDocumentReport,
  HiDocumentText,
} from "react-icons/hi"
import {
  MdContentCopy,
  MdEdit,
  MdPeopleOutline,
  MdPersonAdd,
} from "react-icons/md"

import { MenuItem } from "./menu-item"

const ADMIN_BASE = process.env.REACT_APP_ADMIN_URL

function AdminSidebar() {
  const { clubEvent } = useEventAdmin()
  const { sidebarOpen } = useLayout()

  const eventId = clubEvent?.id ?? 0

  return (
    <aside className={sidebarOpen ? "sidebar toggled" : "sidebar"}>
      <ul className="navigation">
        <MenuItem path={`/admin/event/${eventId}`} icon={<GoHome />} name="Event Admin Home" />
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
          path={`/admin/event/${eventId}/add-player`}
          icon={<MdPersonAdd />}
          name="Add Player(s)"
        />
        <MenuItem
          path={`/admin/event/${eventId}/manage-players`}
          icon={<MdPeopleOutline />}
          name="Move or Drop Player(s)"
        />
        <MenuItem
          path={`/admin/event/${eventId}/event-portal`}
          icon={<GiGolfFlag />}
          name="Edit GG Portal"
        />
        <MenuItem
          path={`/admin/event/${eventId}/documents/tee-times`}
          icon={<HiDocumentText />}
          name="Upload Tee Times"
        />
        <MenuItem
          path={`/admin/event/${eventId}/documents/results`}
          icon={<HiDocumentText />}
          name="Upload Results"
        />
        <MenuItem
          path={`/admin/event/${eventId}/documents/other`}
          icon={<HiDocumentText />}
          name="Upload Event Document"
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
        <MenuItem
          path={`/admin/event/${eventId}/clone-event`}
          icon={<MdContentCopy />}
          name="Clone This Event"
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
