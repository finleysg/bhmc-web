import { GiCheckMark } from "react-icons/gi"

function CheckBox({ label, ...rest }) {
  return (
    <label className="my-checkbox">
      <span className="checkbox__input">
        <input type="checkbox" {...rest} />
        <span className="checkbox__control">
          <GiCheckMark />
        </span>
      </span>
      {Boolean(label) && <span className="checkbox__text">{label}</span>}
    </label>
  )
}

export { CheckBox }
