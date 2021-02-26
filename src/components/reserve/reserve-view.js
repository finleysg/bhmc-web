import React from "react"

import { IndexTab, Tabs } from "components/tabs"

import { ReserveGrid } from "./reserve-grid"

function ReserveView({ reserveTables, onReserve }) {
  const [selectedTableIndex, updateSelectedTableIndex] = React.useState(0)

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
          <ReserveGrid table={reserveTables[selectedTableIndex]} onReserve={onReserve} />
        </div>
      </div>
    </div>
  )
}

export { ReserveView }
