import React from "react"

import Player from "models/player"
import { AsyncTypeahead } from "react-bootstrap-typeahead"
import { client } from "utils/api-client"

function PeoplePicker(props) {
  const { allowNew, onSelect } = props
  const instance = React.useRef()
  const [query, setQuery] = React.useState("")
  const [data, setData] = React.useState([])

  const search = React.useCallback(async () => {
    if (Boolean(query)) {
      const results = await client(`players/?pattern=${query}`)
      setData(results)
    }
  }, [query, setData])

  React.useEffect(() => {
    search()
  }, [search])

  return (
    <div>
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
