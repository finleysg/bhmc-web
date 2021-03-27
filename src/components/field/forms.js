import styled from "@emotion/styled/macro"

import React from "react"

import { useField } from "formik"

import { CheckBox } from "./check-box"

const inputStyles = {
  border: "1px solid #f1f1f4",
  background: "#f1f2f7",
  padding: "8px 12px",
}

const Input = styled.input({ borderRadius: "3px" }, inputStyles)
const Textarea = styled.textarea(inputStyles)

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
      <label htmlFor={id}>{label}</label>
      <i className="form-group__bar"></i>
    </div>
  )
}

const FormCheckbox = ({ label, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(props)
  return (
    <CheckBox
      name={field.name}
      label={label}
      checked={field.checked}
      onChange={(value) => helpers.setValue(value)}
    />
  )
}

const FormGroup = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className={"form-group"}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        value={field.value || ""}
        {...field}
        {...props}
        id={props.name}
        className="form-control"
      />
      <i className="form-group__bar"></i>
      {meta.touched && meta.error ? <div className="invalid-feedback">{meta.error}</div> : null}
    </div>
  )
}

const FormGroupAsTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className={"form-group"}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        value={field.value || ""}
        {...field}
        {...props}
        id={props.name}
        className="form-control"
      />
      <i className="form-group__bar"></i>
      {meta.touched && meta.error ? <div className="invalid-feedback">{meta.error}</div> : null}
    </div>
  )
}

const SelectGroup = ({ label, options, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className={"form-group"}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} id={props.name} className="form-control">
        <option key={0} value={""}>
          -- Select --
        </option>
        {options.map((opt) => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.name}
            </option>
          )
        })}
      </select>
      <i className="form-group__bar"></i>
      {meta.touched && meta.error ? <div className="invalid-feedback">{meta.error}</div> : null}
    </div>
  )
}

export { FloatingInput, FormCheckbox, FormGroup, FormGroupAsTextarea, Input, SelectGroup, Textarea }
