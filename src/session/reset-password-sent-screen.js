import { useAuth } from "context/auth-context"
import { MdAccountCircle } from "react-icons/md"
import { Link } from "react-router-dom"

function ResetPasswordSentScreen() {
  const { user } = useAuth()

  return (
    <div className="login">
      <div className="login__block active">
        <div className="login__header bg-blue">
          <i>
            <MdAccountCircle />
          </i>
          Check Your Email
        </div>

        <div className="login__body">
          <h3>You're Almost Done...</h3>
          <p>
            A password reset email has been sent to: <strong>{user?.email}</strong>.
          </p>
          <p>
            If you don't receive a reset link within a few minutes, check to ensure that your email
            client is not routing email from bhmc.org to junk or spam. If we don't have an account
            record with this email, that would be another reason you might not receive a reset link.
            In that case, please <Link to="/session/account">create an account</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}

export { ResetPasswordSentScreen }
