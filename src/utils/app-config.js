export const currentEnvironment = +process.env.REACT_APP_CURRENT_ENVIRONMENT
export const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY
export const giphyApiKey = process.env.REACT_APP_GIPHY_API_KEY
export const seniorRateAge = +process.env.REACT_APP_SENIOR_AGE
export const seniorCompetitionAge = +process.env.REACT_APP_SENIOR_COMPETITION_AGE
export const sentryApiKey = process.env.REACT_APP_SENTRY_API_KEY
export const version = process.env.REACT_APP_VERSION

export const maintenanceMode = process.env.REACT_APP_MODE !== "Live"
