import { PlayerInfo } from "./player-info"
import { PlayerPassword } from "./player-password"
import { ProfilePic } from "./profile-pic"

function AccountScreen() {
  return (
    <div className="content__inner">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-4">
              <ProfilePic />
            </div>
            <div className="col-sm-8">
              <PlayerInfo />
              <PlayerPassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AccountScreen }
