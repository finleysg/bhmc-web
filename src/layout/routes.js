import { AccountScreen } from "features/account/account-screen"
import CalendarScreen from "features/calendar/calendar-screen"
import { PolicyScreen } from "features/policy/policy-screen"
import MembershipScreen from "features/session/membership-screen"
import AboutPage from "pages/about-page"
import ContactPage from "pages/contact-page"
import MatchPlaySignupPage from "pages/match-play-signup-page"
import { NotFoundScreen } from "pages/not-found"
import PaymentTestPage from "pages/payment-test-page"
import SeasonSignupPage from "pages/season-signup-page"
import SendMessagePage from "pages/send-message-page"
import { TestingScreen } from "pages/testing"

// import { Navigate, Outlet} from "react-router-dom"

const mainRoutes = (user) => [
  { path: "/", element: <TestingScreen /> },
  { path: "/home", element: <TestingScreen /> },
  {
    path: "/membership",
    element: user?.is_authenticated ? <SeasonSignupPage /> : <MembershipScreen />,
  },
  { path: "/calendar/:year/:monthName", element: <CalendarScreen /> },
  { path: "/results", element: <TestingScreen /> },
  { path: "/policies/:policyType", element: <PolicyScreen /> },
  { path: "/match-play", element: <MatchPlaySignupPage /> },
  { path: "/season-long-points", element: <PaymentTestPage /> },
  { path: "/dam-cup", element: <TestingScreen /> },
  { path: "/directory", element: <TestingScreen /> },
  { path: "/contact-us", element: <ContactPage /> },
  { path: "/contact-us/message", element: <SendMessagePage /> },
  { path: "/about-us", element: <AboutPage /> },
  { path: "/my-account", element: <AccountScreen /> },
  { path: "/settings", element: <TestingScreen /> },
  { path: "*", element: <NotFoundScreen /> },
]

export { mainRoutes }
