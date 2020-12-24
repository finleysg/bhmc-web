import { parseJSON } from "date-fns"

function Registration(json) {
  this.obj = json
  this.id = json.id
  this.eventId = json.event
  this.courseId = json.course
  this.signedUpBy = json.signed_up_by
  this.expires = parseJSON(json.expires)
  this.startingHole = json.starting_hole
  this.startingOrder = json.starting_order
  this.notes = json.notes
  this.slots = json.slots ? json.slots.map((s) => new RegistrationSlot(s)) : []

  this.addSlots = (slots) => {
    this.slots = [...slots]
  }
}

function RegistrationSlot(json) {
  this.obj = json
  this.id = json.id
  this.eventId = json.event
  this.registrationId = json.registration
  this.holeId = json.hole
  this.playerId = json.player
  this.startingOrder = json.starting_order
  this.slot = json.slot
  this.status = json.status
}

export { Registration, RegistrationSlot }
