import React from "react"

import { getMonthName } from "components/calendar/calendar-utils"

function useSelectedMonth() {
  const [selectedMonth, setSelectedMonth] = React.useState(() => {
    const now = new Date()
    return {
      year: now.getFullYear(),
      monthName: getMonthName(now.getMonth()),
    }
  })

  return [selectedMonth, setSelectedMonth]
}

export { useSelectedMonth }
