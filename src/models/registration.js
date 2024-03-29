import { immerable } from "immer"

function Registration(json) {
  this[immerable] = true
  this.obj = json
  this.id = json.id
  this.eventId = json.event
  this.courseId = json.course
  this.signedUpBy = json.signed_up_by
  this.expires = new Date(json.expires)
  this.startingHole = json.starting_hole
  this.startingOrder = json.starting_order
  this.notes = json.notes
  this.createdDate = new Date(json.created_date)
  this.slots = json.slots ? json.slots.map((s) => new RegistrationSlot(s)) : []

  this.addSlots = (slots) => {
    this.slots = [...slots]
  }
}

function RegistrationSlot(json) {
  this[immerable] = true
  this.obj = json
  this.id = json.id
  this.eventId = json.event
  this.registrationId = json.registration
  this.holeId = json.hole
  this.playerId = json.player?.id ?? 0
  this.playerName = json.player ? `${json.player?.first_name} ${json.player?.last_name}` : undefined
  this.startingOrder = json.starting_order
  this.slot = json.slot
  this.status = json.status
  this.paidFeeIds = []
}

export { Registration, RegistrationSlot }
