import React from "react"

import { ReserveGrid } from "components/reserve/reserve-grid"
import { OverlaySpinner } from "components/spinners"
import { IndexTab, Tabs } from "components/tabs"
import { useEventRegistrationSlots } from "hooks/event-hooks"
import { LoadReserveTables } from "models/reserve"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router"

function ReservedGridPage({ clubEvent }) {
  const { data: slots } = useEventRegistrationSlots(clubEvent.id)
  const [selectedTableIndex, updateSelectedTableIndex] = React.useState(0)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleRefresh = () => {
    queryClient.invalidateQueries(["event-registration-slots", clubEvent.id])
  }

  const reserveTables = clubEvent.canChoose ? LoadReserveTables(clubEvent, slots) : []

  return (
    <div className="row">
      <div className="col-12">
        <div>
          <OverlaySpinner loading={!reserveTables[0]} />
          {Boolean(reserveTables[0]) && (
            <React.Fragment>
              <Tabs>
                {reserveTables.map((table, index) => {
                  return (
                    <IndexTab
                      key={table.course.id}
                      index={index}
                      selectedIndex={selectedTableIndex}
                      onSelect={(i) => updateSelectedTableIndex(i)}
                    >
                      {table.course.name}
                    </IndexTab>
                  )
                })}
              </Tabs>
              <ReserveGrid
                mode="view"
                table={reserveTables[selectedTableIndex]}
                onBack={() => navigate(-1)}
                onRefresh={handleRefresh}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReservedGridPage
