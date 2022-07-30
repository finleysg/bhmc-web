import "./scores.scss"

import { OverlaySpinner } from "components/spinners"
import { usePlayer } from "hooks/account-hooks"
import { useClubEvents } from "hooks/event-hooks"
import { useCourses, usePlayerScores } from "hooks/score-hooks"
import { useSettings } from "hooks/use-settings"
import { AverageScore, LoadRounds, Score } from "models/round"
import * as colors from "styles/colors"

function HoleScore(props) {
  const { score } = props

  return <div className={score.relativeScoreName()}>{score.score}</div>
}

function RoundTotal(props) {
  const { scores, places } = props

  const totalScore = scores.reduce((total, score) => total + +score.score, 0)
  const par = scores.reduce((total, score) => total + +score.par, 0)

  return (
    <div className={totalScore < par ? "total below-par" : "total above-par"}>
      {Number.parseFloat(totalScore).toFixed(places)}
    </div>
  )
}

function HoleNumbers(props) {
  const { course } = props

  return (
    <div style={{ display: "flex" }}>
      <div className="round" style={{ flex: 1 }}></div>
      <div className="hole-numbers">
        {course.holes.map((hole) => {
          return <div key={hole.id}>{hole.holeNumber}</div>
        })}
        <div className="total"></div>
      </div>
    </div>
  )
}

function HolePars(props) {
  const { course } = props

  return (
    <div style={{ display: "flex" }}>
      <div className="round" style={{ flex: 1 }}></div>
      <div className="scores">
        {course.holes.map((hole) => {
          return (
            <div className={`bg-${course.name.toLowerCase()}-pale`} key={hole.id}>
              {hole.par}
            </div>
          )
        })}
        <div className={`total bg-${course.name.toLowerCase()}-pale`}>36</div>
      </div>
    </div>
  )
}

function Round(props) {
  const { round } = props

  return (
    <div style={{ display: "flex" }}>
      <div className="round" style={{ flex: 1 }}>
        {round.eventDate}
      </div>
      <div className="scores">
        {round.scores.map((score) => {
          return <HoleScore key={score.hole.id} score={score} />
        })}
        <RoundTotal scores={round.scores} places={0} />
      </div>
    </div>
  )
}

function AverageRound(props) {
  const { scores } = props

  return (
    <div style={{ display: "flex" }}>
      <div className="round" style={{ flex: 1 }}>
        Average
      </div>
      <div className="scores">
        {scores.map((score) => {
          return <HoleScore key={score.hole.id} score={score} />
        })}
        <RoundTotal scores={scores} places={1} />
      </div>
    </div>
  )
}

function BestBallRound(props) {
  const { scores } = props

  return (
    <div style={{ display: "flex" }}>
      <div className="round" style={{ flex: 1 }}>
        Best Ball
      </div>
      <div className="scores">
        {scores.map((score) => {
          return <HoleScore key={score.hole.id} score={score} />
        })}
        <RoundTotal scores={scores} places={0} />
      </div>
    </div>
  )
}

function RoundsByCourse(props) {
  const { course, rounds } = props

  const averageScores = () => {
    return course.holes.map((hole) => {
      const scores = []
      rounds.forEach((round) => {
        scores.push(round.scores.find((score) => score.hole.id === hole.id))
      })
      const total = scores.reduce((total, score) => total + +score.score, 0)
      return new AverageScore({
        hole: hole,
        score: total / scores.length,
      })
    })
  }

  const bestScores = () => {
    return course.holes.map((hole) => {
      const scores = []
      rounds.forEach((round) => {
        scores.push(round.scores.find((score) => score.hole.id === hole.id))
      })
      const allScores = scores.map((s) => s.score)
      const lowScore = Math.min(...allScores)
      return new Score({
        hole: {
          id: hole.id,
          hole_number: hole.holeNumber,
          par: hole.par,
        },
        score: lowScore,
      })
    })
  }

  const headerClass = (course) => {
    return `card-header bg-${course.name.toLowerCase()}`
  }

  return (
    <div className="card">
      <div className={headerClass(course)}>
        <span style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem" }}>
          {course.name}
        </span>
      </div>
      {rounds.length > 0 ? (
        <div className="card-body">
          <HoleNumbers course={course} />
          <HolePars course={course} />
          {rounds.map((round) => {
            return <Round key={round.eventDate} round={round} />
          })}
          <hr />
          <AverageRound scores={averageScores()} />
          <BestBallRound scores={bestScores()} />
        </div>
      ) : (
        <div className="card-body">No rounds played</div>
      )}
    </div>
  )
}

export function PlayerScores(props) {
  const { isNet } = props
  const { currentSeason } = useSettings()
  const player = usePlayer()
  const events = useClubEvents(currentSeason)
  const courses = useCourses()
  const { scores, status } = usePlayerScores(currentSeason, player?.id, isNet)

  const rounds = LoadRounds(courses, events, scores)

  const busy = !player?.id || events?.length === 0 || courses?.length === 0 || status === "loading"

  return (
    <div className="row">
      <OverlaySpinner loading={busy} />
      {!busy &&
        courses
          .filter((c) => c.length === 9)
          .map((course) => {
            return (
              <div key={course.id} className="col-lg-4 col-md-12">
                <RoundsByCourse
                  course={course}
                  rounds={rounds.filter((r) => r.course.id === course.id)}
                />
              </div>
            )
          })}
    </div>
  )
}
