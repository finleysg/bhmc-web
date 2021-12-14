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
    if (query) {
      const results = data?.filter((t) => t.name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
      setFilteredTags(results)
    }
  }, [data, query])

  React.useEffect(() => {
    const results = []
    data?.forEach((t) => {
      if (defaultTags?.indexOf(t.name) >= 0) {
        results.push({
          tagName: t.name,
          canRemove: false,
        })
      }
    })
    updateTags(results)
  }, [data, defaultTags, onChange])

  const removeTag = (tag) => {
    const idx = tags.findIndex((t) => t.tagName === tag.tagName)
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
        placeholder="Tags (at least one is required)"
        isLoading={status === "loading"}
        filterBy={["name"]}
        minLength={3}
        allowNew={true}
        onSearch={(query) => {
          setQuery(query)
        }}
        onChange={(selected) => {
          const newTags = tags.slice(0)
          newTags.push({
            tagName: selected[0].name || selected[0],
            canRemove: true,
          })
          updateTags(newTags)
          onChange(newTags.map((t) => t.tagName))
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
