import { AccountScreen } from "components/account/account-screen"
import AboutPage from "pages/about-page"
import CalendarPage from "pages/calendar-page"
import ContactPage from "pages/contact-page"
import DamCupPage from "pages/dam-cup-page"
import DirectoryPage from "pages/directory-page"
import EventDetailPage from "pages/event-detail-page"
import GalleryImagePage from "pages/gallery-image-page"
import HomePage from "pages/home-page"
import MaintenancePage from "pages/maintenance-page"
import MatchPlayPage from "pages/match-play--page"
import { NotFoundScreen } from "pages/not-found"
import PhotoGalleryPage from "pages/photo-gallery-page"
import PlayerProfilePage from "pages/player-profile-page"
import PlayerScoresPage from "pages/player-scores-page"
import PolicyPage from "pages/policy-page"
import ReservedPage from "pages/reserved-page"
import ResultsPage from "pages/results-page"
import SeasonLongPointsPage from "pages/season-long-points"
import SeasonSignupPage from "pages/season-signup-page"
import SendMessagePage from "pages/send-message-page"
import SettingsPage from "pages/settings-page"
import { UnfinishedPage } from "pages/unfinished-page"
import MembershipScreen from "session/membership-screen"
import * as config from "utils/app-config"

const mainRoutes = (user) =>
  config.maintenanceMode
    ? [{ path: "*", element: <MaintenancePage /> }]
    : [
        { path: "/", element: <HomePage /> },
        { path: "/home", element: <HomePage /> },
        {
          path: "/membership",
          element: user?.is_authenticated ? <SeasonSignupPage /> : <MembershipScreen />,
        },
        { path: "/calendar/:year/:monthName", element: <CalendarPage /> },
        { path: "/event/:eventDate/:eventName", element: <EventDetailPage /> },
        { path: "/event/:eventDate/:eventName/register", element: <UnfinishedPage /> },
        { path: "/event/:eventDate/:eventName/registrations", element: <ReservedPage /> },
        { path: "/results/:eventType/:season", element: <ResultsPage /> },
        { path: "/my-scores/:scoreType", element: <PlayerScoresPage /> },
        { path: "/policies/:policyType", element: <PolicyPage /> },
        { path: "/match-play", element: <MatchPlayPage /> },
        { path: "/season-long-points", element: <SeasonLongPointsPage /> },
        { path: "/dam-cup", element: <DamCupPage /> },
        { path: "/directory", element: <DirectoryPage /> },
        { path: "/directory/:playerId", element: <PlayerProfilePage /> },
        { path: "/contact-us", element: <ContactPage /> },
        { path: "/contact-us/message", element: <SendMessagePage /> },
        { path: "/about-us", element: <AboutPage /> },
        { path: "/gallery", element: <PhotoGalleryPage /> },
        { path: "/gallery/:id", element: <GalleryImagePage /> },
        { path: "/my-account", element: <AccountScreen /> },
        { path: "/settings", element: <SettingsPage /> },
        { path: "*", element: <NotFoundScreen /> },
      ]

export { mainRoutes }
