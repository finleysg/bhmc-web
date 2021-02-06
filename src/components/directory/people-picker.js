import React from "react"

import { useClient } from "context/auth-context"
import Player from "models/player"
import { AsyncTypeahead } from "react-bootstrap-typeahead"

const playerFilter = (clubEvent, players) => {
  if (clubEvent && clubEvent.id) {
    return players
      .filter((p) => p.event_status !== null)
      .filter((p) =>
        clubEvent.registrationType === "Members Only" ? p.member_status === "R" : true,
      )
      .filter((p) => (clubEvent.ghinRequired ? Boolean(p.ghin) : true))
  }
  return players
}

function PeoplePicker({ allowNew, clubEvent, onSelect, ...rest }) {
  const instance = React.useRef()
  const [query, setQuery] = React.useState("")
  const [data, setData] = React.useState([])
  const client = useClient()

  const search = React.useCallback(async () => {
    if (Boolean(query)) {
      const results = await client(`player-search/?pattern=${query}&event_id=${clubEvent?.id ?? 0}`)
      const filteredResults = playerFilter(clubEvent, results)
      setData(filteredResults)
    }
  }, [query, clubEvent, setData, client])

  React.useEffect(() => {
    search()
  }, [search])

  return (
    <div {...rest}>
      <AsyncTypeahead
        id="player-search"
        ref={(typeahead) => (instance.current = typeahead)}
        placeholder="Search for player..."
        labelKey={(option) => `${option.first_name} ${option.last_name}`}
        isLoading={false}
        minLength={3}
        highlightOnlyResult={!allowNew}
        newSelectionPrefix={"Add new player: "}
        allowNew={allowNew}
        onSearch={(query) => {
          setQuery(query)
        }}
        onChange={(selected) => {
          onSelect(new Player(selected[0]))
          if (instance && instance.current) {
            instance.current.clear()
          }
        }}
        options={data}
      />
    </div>
  )
}

export default PeoplePicker
