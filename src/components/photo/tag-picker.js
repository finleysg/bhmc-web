import React, { useState } from "react"

import { useTags } from "hooks/photo-hooks"
import { AsyncTypeahead } from "react-bootstrap-typeahead"

import { TagList } from "./tag-list"

function TagPicker(props) {
  const { defaultTags, onChange } = props
  const [tags, updateTags] = useState([])
  const [query, setQuery] = React.useState("")
  const [filteredTags, setFilteredTags] = React.useState([])
  const { data, status } = useTags()
  const instance = React.useRef()

  React.useEffect(() => {
    if (Boolean(query)) {
      const results = data?.filter((t) => t.name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
      setFilteredTags(results)
    }
  }, [data, query])

  React.useEffect(() => {
    const results = []
    data?.forEach((t) => {
      if (defaultTags.indexOf(t.name) >= 0) {
        t.canRemove = false
        results.push(t)
      }
    })
    updateTags(results)
  }, [data, defaultTags])

  const removeTag = (tag) => {
    const idx = tags.findIndex((t) => t.id === tag.id)
    if (idx >= 0) {
      const updatedTags = tags.slice(0)
      updatedTags.splice(idx, 1)
      updateTags(updatedTags)
      onChange(updatedTags)
    }
  }

  return (
    <div>
      <AsyncTypeahead
        id="tag-picker"
        ref={(typeahead) => (instance.current = typeahead)}
        labelKey="name"
        placeholder="Tags..."
        isLoading={status === "loading"}
        filterBy={["name"]}
        minLength={3}
        allowNew={true}
        onSearch={(query) => {
          setQuery(query)
        }}
        onChange={(selected) => {
          selected[0].canRemove = true
          tags.push(selected[0])
          const newTags = tags.slice(0)
          updateTags(newTags)
          onChange(newTags)
          if (instance && instance.current) {
            instance.current.clear()
          }
        }}
        options={filteredTags}
      />
      <TagList tags={tags} removeTag={removeTag} />
      {status === "error" && <span className="text-danger">Doh!</span>}
    </div>
  )
}

export { TagPicker }
