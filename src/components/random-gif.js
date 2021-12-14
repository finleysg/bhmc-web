import React from "react"

import * as config from "utils/app-config"
import { useAsync } from "utils/use-async"

import poweredBy from "../assets/img/Poweredby_100px-White_VertLogo.png"

const gifs = [
  "akiHW8qDydkm4",
  "F0HQQ0p3Mp8QM",
  "dOdfxZkkKFgOc",
  "bSuWe6oHfDh28S9hop",
  "uudzUtVcsLAoo",
  "j1gDGxFWrAaRbzbMx5",
  "lsAWu6CohyfS9JpSBh",
  "lP4e1a0tMGKfRdJIuc",
  "ixCowpFMOukIRT0aoU",
  "3oEjHJZT3q9EdNEnAY",
  "xT0GqK04xsopWbJKFi",
  "xT5LMAdfzp0iSqyGFq",
  "fnEgBnP4laVzUj37Js",
  "eNJWU4RPE0W76",
  "xUOwG43OJ9Mzf4exQQ",
  "bIWZ66ltn2DyE",
  "xT0GqHz7dP8eJW8f28",
  "146YfoNq3cuM7u",
  "OPl1CmAfplB1C",
  "jc9oQKgNskjba",
  "QJiuU3d3gvf1u",
  "ZfORfp3xtFL6E",
  "1rPSYA7TX5wyBpwQl8",
  "2XflxzFnvKAN1YVrGmc",
  "2pcoCqjPdQwAU",
  "zz4wwa2Sjpi6s",
  "j1gDGxFWrAaRbzbMx5",
  "ixCowkCVasW8d7YmMo",
  "fxOkhf5sUiK5ST3gWC",
  "S8NJU0joXkkrFw49Gr",
]

const getRandomGif = () => {
  const min = 0
  const max = gifs.length - 1
  const gifIndex = Math.floor(Math.random() * (max - min + 1) + min)
  return gifs[gifIndex]
}

const giphy = async () => {
  const response = await window.fetch(`https://api.giphy.com/v1/gifs/${getRandomGif()}?api_key=${config.giphyApiKey}`)
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
  const { enabled } = props
  const { run, data } = useAsync()

  React.useEffect(() => {
    run(giphy())
  }, [run])

  return (
    <div style={{ textAlign: "center" }}>
      {data && enabled && (
        <>
          <img
            style={{ maxWidth: "100%", objectFit: "contain" }}
            src={data.url}
            title={data.title}
            alt="Random golf gif"
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
  )
}

export { RandomGif }
