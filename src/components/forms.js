import styled from "@emotion/styled/macro"

import React from "react"

const inputStyles = {
  border: "1px solid #f1f1f4",
  background: "#f1f2f7",
  padding: "8px 12px",
}

const Input = styled.input({ borderRadius: "3px" }, inputStyles)
const Textarea = styled.textarea(inputStyles)

const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
})

function FloatingInput({ typeVariant, id, label }) {
  const [active, setActive] = React.useState(false)

  const handleChange = (event) => {
    const { value } = event.target
    setActive(value?.length > 0)
  }
  return (
    <div className={"form-group form-group--float form-group--centered"}>
      <input
        onChange={handleChange}
        type={typeVariant}
        id={id}
        className={`form-control ${active ? "form-control--active" : ""}`}
      />
      <label>{label}</label>
      <i className="form-group__bar"></i>
    </div>
  )
}

export { FloatingInput, FormGroup, Input, Textarea }
