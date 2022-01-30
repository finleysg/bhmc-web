import React from "react"

import * as config from "utils/app-config"
import { useAsync } from "utils/use-async"

import poweredBy from "../assets/img/Poweredby_100px-White_VertLogo.png"

// gwAYrJaPllFEH55xua

const gif = async () => {
  const response = await window.fetch(
    `https://api.giphy.com/v1/gifs/gwAYrJaPllFEH55xua?api_key=${config.giphyApiKey}`,
  )
  const result = await response.json()
  if (result && result.data) {
    return {
      url: result.data.images.downsized.url,
      title: result.data.title,
    }
  }
  return null
}

export default function MaintenancePage() {
  const { run, data } = useAsync()

  React.useEffect(() => {
    run(gif())
  }, [run])

  return (
    <div className="content__inner">
      <div style={{ margin: "20px auto 0 auto", textAlign: "center" }}>
        <h1 className="text-danger">System Maintenance</h1>
        <div style={{ textAlign: "center" }}>
          {data && (
            <>
              <img
                style={{ maxWidth: "100%", objectFit: "contain" }}
                src={data.url}
                title={data.title}
                alt="System maintenance"
              />
              <img
                style={{ display: "block", margin: "1rem auto 0 auto" }}
                src={poweredBy}
                alt="Powered By Giphy"
                title="Powered By Giphy"
              />
            </>
          )}
        </div>
        <h3 className="text-primary" style={{ marginTop: "30px" }}>
          We're Doing Some Work
        </h3>
        <p>The website will return shortly.</p>
      </div>
    </div>
  )
}
