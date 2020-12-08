import React from "react"

import { MdCameraAlt } from "react-icons/md"
import { toast } from "react-toastify"

import defaultProfilePic from "../../assets/img/unknown.jpg"
import { usePlayer, usePlayerProfilePic } from "./account-hooks"
import { ProfilePicPicker } from "./profile-pic-picker"

function ProfilePic() {
  const [mode, setMode] = React.useState("view")
  const player = usePlayer()
  const [saveProfilePic] = usePlayerProfilePic()

  async function handleSelectedFile(file) {
    const form = new FormData()
    form.append("player_id", player.id)
    form.append("year", 0)
    form.append("caption", player.name)
    form.append("raw_image", file, file.name)

    await saveProfilePic(form, {
      onSuccess: () => {
        toast.success("📸 Your profile picture has been updated")
        setMode("view")
      },
    })
  }

  if (mode === "view") {
    return (
      <div className="pm-overview c-overflow">
        <div className="pmo-pic">
          <div className="p-relative">
            <span>
              {player && player.profilePicture() ? (
                <img className="img-responsive" src={player.profilePicture()} alt="Profile" />
              ) : (
                <img className="img-responsive" src={defaultProfilePic} alt="Profile" />
              )}
            </span>
            <button onClick={() => setMode("edit")} className="pmop-edit">
              <i>
                <MdCameraAlt />
              </i>{" "}
              <span className="hidden-xs-down">Update Profile Picture</span>
            </button>
          </div>
          <div className="pmo-stat">
            <h2>{player?.name}</h2>
          </div>
        </div>
      </div>
    )
  } else {
    return <ProfilePicPicker onSelect={handleSelectedFile} onCancel={() => setMode("view")} />
  }
}

export { ProfilePic }
