import React from "react"

import { LoadingSpinner } from "components/spinners"
import { MdCameraAlt } from "react-icons/md"
import { toast } from "react-toastify"

import defaultProfilePic from "../../assets/img/unknown.jpg"
import { usePlayer, usePlayerProfilePic } from "../../hooks/account-hooks"
import { ProfilePicPicker } from "./profile-pic-picker"

function ProfilePic() {
  const [mode, setMode] = React.useState("view")
  const player = usePlayer()
  const { mutate: saveProfilePic, isLoading } = usePlayerProfilePic()

  const handleSelectedFile = (file) => {
    const form = new FormData()
    form.append("player_id", player.id)
    form.append("year", 0)
    form.append("caption", player.name)
    form.append("raw_image", file, file.name)

    saveProfilePic(form, {
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
              {player && player.imageUrl() ? (
                <picture>
                  <source srcSet={player.mobileImageUrl()} media="(max-width: 600px)" />
                  <source srcSet={player.webImageUrl()} media="(max-width: 1200px)" />
                  <img src={player.imageUrl()} alt="Profile" />
                </picture>
              ) : (
                <img className="img-responsive" src={defaultProfilePic} alt="Default Profile" />
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
    return (
      <React.Fragment>
        {isLoading && <LoadingSpinner loading={true} offset={90} />}
        {isLoading || (
          <ProfilePicPicker onSelect={handleSelectedFile} onCancel={() => setMode("view")} />
        )}
      </React.Fragment>
    )
  }
}

export { ProfilePic }
