import { differenceInYears, lastDayOfYear, parseISO } from "date-fns"
import { immerable } from "immer"

const serverUrl = process.env.REACT_APP_SERVER_URL

function Player(json) {
  this[immerable] = true
  this.obj = json
  this.id = json.id
  this.email = json.email
  this.name = Boolean(json.id) ? `${json.first_name} ${json.last_name}` : ""
  this.ghin = json.ghin
  this.birthDate = parseISO(json.birth_date)
  this.phoneNumber = json.phone_number
  this.tee = json.tee
  this.age = differenceInYears(new Date(), this.birthDate)
  this.age2 = differenceInYears(lastDayOfYear(new Date()), this.birthDate) // age at the end of the year
  this.isFriend = false

  this.imageUrl = () => {
    if (!json.profile_picture) {
      return undefined
    }
    if (json.profile_picture.image_url.startsWith("http")) {
      return json.profile_picture.image_url // production (from Amazon storage)
    }
    return `${serverUrl}${json.profile_picture.image_url}`
  }

  this.webImageUrl = () => {
    if (!json.profile_picture) {
      return undefined
    }
    if (json.profile_picture.web_url.startsWith("http")) {
      return json.profile_picture.web_url // production (from Amazon storage)
    }
    return `${serverUrl}${json.profile_picture.web_url}`
  }

  this.mobileImageUrl = () => {
    if (!json.profile_picture) {
      return undefined
    }
    if (json.profile_picture.mobile_url.startsWith("http")) {
      return json.profile_picture.mobile_url // production (from Amazon storage)
    }
    return `${serverUrl}${json.profile_picture.mobile_url}`
  }
}

export default Player
