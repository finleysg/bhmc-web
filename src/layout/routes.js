import { AccountScreen } from "features/account/account-screen"
import CalendarScreen from "features/calendar/calendar-screen"
import SeasonSignupFlow from "features/event-registration/season-signup-flow"
import { NotFoundScreen } from "features/not-found"
import { PolicyScreen } from "features/policy/policy-screen"
import MembershipScreen from "features/session/membership-screen"
import { TestingScreen } from "features/testing"

// import { Navigate, Outlet} from "react-router-dom"

const mainRoutes = (user) => [
  { path: "/", element: <TestingScreen /> },
  { path: "/home", element: <TestingScreen /> },
  {
    path: "/membership",
    element: user?.is_authenticated ? <SeasonSignupFlow /> : <MembershipScreen />,
  },
  { path: "/calendar/:year/:monthName", element: <CalendarScreen /> },
  { path: "/results", element: <TestingScreen /> },
  { path: "/policies/:policyType", element: <PolicyScreen /> },
  { path: "/match-play", element: <TestingScreen /> },
  { path: "/season-long-points", element: <TestingScreen /> },
  { path: "/dam-cup", element: <TestingScreen /> },
  { path: "/directory", element: <TestingScreen /> },
  { path: "/contact-us", element: <TestingScreen /> },
  { path: "/about-us", element: <TestingScreen /> },
  { path: "/my-account", element: <AccountScreen /> },
  { path: "/settings", element: <TestingScreen /> },
  { path: "*", element: <NotFoundScreen /> },
]

export { mainRoutes }
