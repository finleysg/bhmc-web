import { AccountScreen } from "features/account/account-screen"
import MembershipScreen from "features/session/membership-screen"
import AboutPage from "pages/about-page"
import CalendarPage from "pages/calendar-page"
import ContactPage from "pages/contact-page"
import DamCupPage from "pages/dam-cup-page"
import DirectoryPage from "pages/directory-page"
import EventDetailPage from "pages/event-detail-page"
import HomePage from "pages/home-page"
import MatchPlaySignupPage from "pages/match-play-signup-page"
import { NotFoundScreen } from "pages/not-found"
import PaymentTestPage from "pages/payment-test-page"
import PlayerProfilePage from "pages/player-profile-page"
import PolicyPage from "pages/policy-page"
import ResultsPage from "pages/results-page"
import SeasonLongPointsPage from "pages/season-long-points"
import SeasonSignupPage from "pages/season-signup-page"
import SendMessagePage from "pages/send-message-page"
import SettingsPage from "pages/settings-page"
import SignupsPage from "pages/signups-page"
import { UnfinishedPage } from "pages/unfinished-page"

const mainRoutes = (user) => [
  { path: "/", element: <HomePage /> },
  { path: "/home", element: <HomePage /> },
  {
    path: "/membership",
    element: user?.is_authenticated ? <SeasonSignupPage /> : <MembershipScreen />,
  },
  { path: "/calendar/:year/:monthName", element: <CalendarPage /> },
  { path: "/event/:eventDate/:eventName", element: <EventDetailPage /> },
  { path: "/event/:eventDate/:eventName/register", element: <UnfinishedPage /> },
  { path: "/event/:eventDate/:eventName/registrations", element: <SignupsPage /> },
  { path: "/results/:eventType/:season", element: <ResultsPage /> },
  { path: "/policies/:policyType", element: <PolicyPage /> },
  { path: "/match-play", element: <MatchPlaySignupPage /> },
  { path: "/season-long-points", element: <SeasonLongPointsPage /> },
  { path: "/dam-cup", element: <DamCupPage /> },
  { path: "/directory", element: <DirectoryPage /> },
  { path: "/directory/:playerId", element: <PlayerProfilePage /> },
  { path: "/contact-us", element: <ContactPage /> },
  { path: "/contact-us/message", element: <SendMessagePage /> },
  { path: "/about-us", element: <AboutPage /> },
  { path: "/my-account", element: <AccountScreen /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "/payment-test", element: <PaymentTestPage /> },
  { path: "*", element: <NotFoundScreen /> },
]

export { mainRoutes }
