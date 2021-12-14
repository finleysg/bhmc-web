import React from "react"

import { IndexTab, Tabs } from "components/tabs"
import { useEventRegistration } from "context/registration-context"

import { ReserveGrid } from "./reserve-grid"

function ReserveView({ reserveTables, onReserve, onRefresh, onBack }) {
  const [selectedTableIndex, updateSelectedTableIndex] = React.useState(0)
  const { error } = useEventRegistration()

  return (
    <div className="row">
      <div className="col-12">
        <div>
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
            table={reserveTables[selectedTableIndex]}
            mode="register"
            error={error}
            onReserve={onReserve}
            onRefresh={onRefresh}
            onBack={onBack}
          />
        </div>
      </div>
    </div>
  )
}

export { ReserveView }
