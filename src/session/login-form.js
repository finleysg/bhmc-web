import React from "react"

import { ErrorMessage } from "components/errors"
import { FloatingInput } from "components/forms"
import { MdArrowForward } from "react-icons/md"
import { useAsync } from "utils/use-async"

function LoginForm({ onSubmit }) {
  const { isError, error, run } = useAsync()

  function handleSubmit(event) {
    event.preventDefault()
    const { email, password } = event.target.elements

    run(
      onSubmit({
        email: email.value,
        password: password.value,
      }),
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <FloatingInput typeVariant="text" id="email" label="Email Address" />
      <FloatingInput typeVariant="password" id="password" label="Password" />
      <button type="submit" className="btn btn--icon bg-green">
        <i>
          <MdArrowForward style={{ marginTop: ".5rem" }} />
        </i>
      </button>
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  )
}

export { LoginForm }
