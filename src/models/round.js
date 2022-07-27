import { isoDayFormat } from "utils/event-utils"

// {
//   "id": 2584,
//   "event": 423,
//   "player": 1,
//   "hole": {
//       "id": 1,
//       "course": 1,
//       "hole_number": 1,
//       "par": 4
//   },
//   "score": 6,
//   "is_net": false
// },
export function Score(json) {
  this.id = json.id
  this.eventId = json.event
  this.playerId = json.player
  this.hole = new Hole(json.hole)
  this.score = json.score
  this.isNet = json.is_net

  this.relativeScoreName = () => {
    if (this.score === this.hole.par) {
      return "par"
    } else if (this.score === this.hole.par - 1) {
      return "birdie"
    } else if (this.score === this.hole.par - 2) {
      return "eagle"
    } else if (this.score === this.hole.par - 3) {
      return "double-eagle"
    } else if (this.score === this.hole.par + 1) {
      return "bogey"
    } else if (this.score === this.hole.par + 2) {
      return "double-bogey"
    } else {
      return "other"
    }
  }
}

export function AverageScore(obj) {
  this.hole = obj.hole
  this.score = Number.parseFloat(obj.score).toFixed(1)

  this.relativeScoreName = () => {
    if (+this.score < this.hole.par) {
      return "below-par"
    } else {
      return "above-par"
    }
  }
}

export function Round(course, event, scores) {
  this.course = course
  this.eventName = event.name
  this.eventDate = isoDayFormat(event.startDate)
  this.scores = scores
}

export function Course(json) {
  this.id = json.id
  this.name = json.name
  this.length = json.number_of_holes
  this.holes = json.holes.map((h) => new Hole(h))
}

export function Hole(json) {
  this.id = json.id
  this.holeNumber = json.hole_number
  this.par = json.par
}

export const LoadRounds = (courses, events, scores) => {
  const rounds = []
  const scoresByEvent = scores.reduce((byEvent, score) => {
    if (!byEvent[score.eventId]) {
      byEvent[score.eventId] = []
    }

    byEvent[score.eventId].push(score)

    return byEvent
  }, {})

  for (const eventId of Object.keys(scoresByEvent)) {
    const course = getCourse(courses, scoresByEvent[eventId][0].hole)
    const clubEvent = events.find((e) => e.id === +eventId)
    rounds.push(new Round(course, clubEvent, scoresByEvent[eventId]))
  }
  return rounds
}

const getCourse = (courses, firstHole) => {
  return courses.find((course) => course.holes.findIndex((hole) => hole.id === firstHole.id) >= 0)
}
