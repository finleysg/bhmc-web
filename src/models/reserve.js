import { RegistrationSlot } from "./registration"

const { parse, addMinutes, format } = require("date-fns")

const getStatusName = (statusCode) => {
  switch (statusCode) {
    case "A":
      return "Available"
    case "P":
      return "In Progress"
    case "R":
      return "Reserved"
    case "X":
      return "Payment Processing"
    default:
      return "Unavailable"
  }
}

// {
//     id: 3928,
//     event: 339,
//     hole: 1,
//     registration: null,
//     starting_order: 0,
//     slot: 0,
//     status: "A",
//     player: null,
// }
function ReserveSlot(groupId, json) {
  this.id = json.id
  this.groupId = groupId
  this.holeId = json.hole
  this.playerId = json.player?.id
  this.playerName = Boolean(json.player) ? `${json.player.first_name} ${json.player.last_name}` : ""
  this.position = json.slot // 0 to size of group - 1
  this.registrationId = json.registration
  this.startingOrder = json.starting_order
  this.status = json.status
  this.statusName = getStatusName(json.status)
  this.selected = false
  this.fees = []
  this.obj = json

  this.isRegistered = (playerId) => {
    return this.playerId === playerId
  }

  this.displayText = () => {
    if (this.selected && this.status === "A") {
      return "Selected"
    } else if (this.status === "R") {
      return this.playerName
    } else if (this.status === "X") {
      return `${this.playerName} (unconfirmed)`
    } else {
      return this.statusName
    }
  }

  this.canSelect = () => {
    return this.status === "A"
  }

  this.toRegistrationSlot = () => {
    return new RegistrationSlot(this.obj)
  }
}

function ReserveGroup(course, hole, slots, name) {
  this.id = `${course.name.toLowerCase()}-${name.toLowerCase()}`
  this.courseId = course.id
  this.holeId = hole.id
  this.holeNumber = hole.holeNumber
  this.slots = slots.map((slot) => new ReserveSlot(this.id, slot))
  this.startingOrder = this.slots[0]?.startingOrder
  this.name = name // starting hole or tee time

  this.isRegistered = (playerId) => {
    return this.slots.some((slot) => {
      return slot.isRegistered(playerId)
    })
  }

  this.hasOpenings = () => {
    return this.slots.some((s) => {
      return s.status === "A"
    })
  }

  this.isDisabled = () => {
    return !this.slots.some((s) => {
      return s.selected
    })
  }

  this.selectedSlotIds = () => {
    return this.slots.filter((s) => s.selected).map((s) => s.id)
  }
}

function ReserveTable(course) {
  this.course = course
  this.groups = []

  /**
   * Clear any selections in a different row
   * @param {string} groupName - The only group that should have selections
   */
  this.clearOtherGroups = (groupName) => {
    this.groups.forEach((group) => {
      group.slots.forEach((slot) => {
        if (group.name !== groupName) {
          slot.selected = false
        }
      })
    })
  }

  /**
   * Apply any selections to this table
   * @param {Array} selectedSlots - An array of selected slot
   */
  this.applySelectedSlots = (selectedSlots) => {
    this.groups.forEach((group) => {
      group.slots.forEach((slot) => {
        slot.selected = false
        if (selectedSlots.findIndex((s) => s.id === slot.id) >= 0) {
          slot.selected = true
        }
      })
    })
  }

  /**
   * Return slots that are part of a given registation
   * @param {number} registrationId - The registration
   */
  this.findSlotsByRegistrationId = (registrationId) => {
    const slots = []
    this.groups.forEach((group) => {
      group.slots.forEach((slot) => {
        if (slot.registrationId === registrationId && Boolean(slot.playerId)) {
          slots.push(slot)
        }
      })
    })
    return slots
  }
}

const LoadReserveTables = (clubEvent, slots) => {
  if (Boolean(slots) && slots.length > 0) {
    if (clubEvent.startTypeCode === "TT") {
      return createTeeTimes(clubEvent, slots)
    } else if (clubEvent.startTypeCode === "SG") {
      return createShotgun(clubEvent, slots)
    } else {
      throw new Error(
        `${clubEvent.startTypeCode} is an invalid start type for an event where players can choose their tee time or starting hole.`,
      )
    }
  }
  return []
}

// each table is a hierarchy: course --> groups --> slots
const createTeeTimes = (clubEvent, slots) => {
  const tables = []
  const startingTime = parse(clubEvent.startTime, "h:mm a", clubEvent.startDate)

  clubEvent.courses.forEach((course) => {
    const table = new ReserveTable(course)
    const firstHole = course.holes[0]
    for (let i = 0; i < clubEvent.totalGroups; i++) {
      const group = slots.filter((slot) => {
        return slot.starting_order === i && slot.hole === firstHole.id
      })
      const teetime = calculateTeetime(startingTime, i)
      table.groups.push(new ReserveGroup(course, firstHole, group, teetime))
    }
    tables.push(table)
  })

  return tables
}

const createShotgun = (clubEvent, slots) => {
  const tables = []

  clubEvent.courses.forEach((course) => {
    const table = new ReserveTable(course)
    course.holes.forEach((hole) => {
      const aGroup = slots.filter((slot) => {
        return slot.hole === hole.id && slot.starting_order === 0
      })
      const bGroup = slots.filter((slot) => {
        return slot.hole === hole.id && slot.starting_order === 1
      })
      table.groups.push(new ReserveGroup(course, hole, aGroup, `${hole.holeNumber}A`))
      table.groups.push(new ReserveGroup(course, hole, bGroup, `${hole.holeNumber}B`))
    })
    tables.push(table)
  })

  return tables
}

const calculateTeetime = (startingTime, startingOrder) => {
  const offset = startingOrder * 8
  return format(addMinutes(startingTime, offset), "h:mm a")
}

const calculateStartingHole = (holeNumber, startingOrder) => {
  return `${holeNumber}${startingOrder === 0 ? "A" : "B"}`
}

const GetGroupStartName = (clubEvent, startingHole, startingOrder) => {
  if (clubEvent.startType === "Shotgun") {
    return calculateStartingHole(startingHole, startingOrder)
  } else {
    const startingTime = parse(clubEvent.startTime, "h:mm a", clubEvent.startDate)
    return calculateTeetime(startingTime, startingOrder)
  }
}

export { GetGroupStartName, LoadReserveTables, ReserveGroup, ReserveSlot, ReserveTable }
