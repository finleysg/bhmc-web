import React from "react"

function TextField(props) {
  const { text, mode, onChange } = props

  function handleChange(event) {
    const { value } = event.target
    onChange({
      source: "textField",
      content: value,
    })
  }

  // Make sure we don't assign undefined to the input, otherwise we will go from uncontrolled to controlled.
  return (
    <React.Fragment>
      {mode === "view" ? text : text && <input type="text" value={text} onChange={handleChange} />}
    </React.Fragment>
  )
}

export { TextField }
