import { useAuth } from "context/auth-context"
import { Link } from "react-router-dom"

function CreateAccountButton({ ...props }) {
  const { user } = useAuth()

  if (!user?.is_authenticated) {
    return (
      <Link className="btn btn-success btn-sm" to="/session/account" {...props}>
        Sign Up For an Account
      </Link>
    )
  }
}

export { CreateAccountButton }
