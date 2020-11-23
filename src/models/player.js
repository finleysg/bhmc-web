import moment from "moment"

const serverUrl = process.env.REACT_APP_SERVER_URL

function Player(json) {
  this.obj = json
  this.id = json.id
  this.email = json.email
  this.name = `${json.first_name} ${json.last_name}`
  this.ghin = json.ghin
  this.birthDate = moment(json.birth_date)
  this.phoneNumber = json.phone_number
  this.tee = json.tee
  this.age = moment().diff(this.birthDate, "year")

  this.profilePicture = () => {
    if (!json.profile_picture) {
      return undefined
    }
    if (json.profile_picture.thumbnail_url.startsWith("http")) {
      return json.profile_picture.thumbnail_url // production (from Amazon storage)
    }
    return `${serverUrl}${json.profile_picture.thumbnail_url}`
  }
}

export default Player