import { useAuth } from "context/auth-context"
import { Link } from "react-router-dom"

function LoginButton({ ...props }) {
  const { user } = useAuth()

  if (!user?.is_authenticated) {
    return (
      <Link className="btn btn-primary btn-sm" to="/session/login" {...props}>
        Login
      </Link>
    )
  }
}

export { LoginButton }
