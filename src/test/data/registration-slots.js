// {
//     "id": 3928,
//     "event": 339,
//     "hole": 1,
//     "registration": null,
//     "starting_order": 0,
//     "slot": 0,
//     "status": "A",
//     "player": null
// },
import { build, fake, sequence } from "@jackfranklin/test-data-bot"

const buildSlot = build("slot", {
  fields: {
    id: sequence((n) => n),
    event: fake((f) => f.random.number(100)),
    hole: 0,
    registration: null,
    starting_order: 0,
    slot: 0,
    status: "A",
    player: null,
  },
})

const buildTeetimeSlots = (eventId, holeId, groups, groupSize) => {
  const slots = []
  for (let i = 0; i < groups * groupSize; i++) {
    const slot = buildSlot({
      overrides: {
        event: eventId,
        hole: holeId,
        starting_order: Math.floor(i / groupSize),
        slot: i % groupSize,
      },
    })
    slots.push(slot)
  }
  return slots
}

const buildShotgunSlots = (eventId, holeId, groups, groupSize) => {
  const slots = []
  for (let i = 0; i < groups * groupSize; i++) {
    const slot = buildSlot({
      overrides: {
        event: eventId,
        hole: holeId + Math.floor(i / (groupSize * 2)),
        starting_order: Math.floor(i / groupSize) % 2,
        slot: i % groupSize,
      },
    })
    slots.push(slot)
  }
  return slots
}

export { buildShotgunSlots, buildSlot, buildTeetimeSlots }
