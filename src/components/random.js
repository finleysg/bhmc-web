import React from "react"

import * as config from "utils/app-config"

const giphy = async (tag) => {
  const response = await window.fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${config.giphyApiKey}&tag=${tag}&rating=pg`,
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

function RandomGif(props) {
  const { tag, enabled } = props
  const [randomGiphy, setRandomGiphy] = React.useState()

  const getRandomGif = React.useCallback(async () => {
    if (enabled) {
      const gif = await giphy(tag)
      if (gif) {
        setRandomGiphy(gif)
      }
    }
  }, [tag, enabled])

  React.useEffect(() => {
    getRandomGif()
  }, [getRandomGif])

  return (
    <div style={{ textAlign: "center" }}>
      {randomGiphy && (
        <img
          style={{ maxWidth: "100%", objectFit: "contain" }}
          src={randomGiphy.url}
          title={randomGiphy.title}
          alt="Random golf gif"
        />
      )}
    </div>
  )
}

export { RandomGif }
