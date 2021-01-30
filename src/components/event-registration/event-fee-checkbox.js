import React from "react"

import { CheckBox } from "components/field/check-box"

function EventFeeCheckbox({ isRequired, isSelected, onChange, ...rest }) {
  const handleChange = () => {
    onChange(!isSelected)
  }

  const getTitle = () => {
    if (isSelected) {
      return "Remove from registration"
    }
    return "Add to registration"
  }

  return <CheckBox title={getTitle()} checked={isSelected} onChange={handleChange} {...rest} />
}

export default EventFeeCheckbox
