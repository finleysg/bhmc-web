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
  const [eventId, setEventId] = React.useState()
  const { clubEvent } = useEventAdmin()
  const { sidebarOpen } = useLayout()

  React.useEffect(() => {
    if (Boolean(clubEvent?.id)) {
      setEventId(clubEvent.id)
    }
  }, [clubEvent])

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
