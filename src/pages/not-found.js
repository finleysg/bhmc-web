import React from "react"

import Lost from "../assets/img/LostBall.png"

function NotFoundScreen() {
  return (
    <div className="content__inner">
      <div style={{ margin: "20px auto 0 auto", textAlign: "center" }}>
        <h1 className="text-primary">404</h1>
        <img src={Lost} alt="404 Not Found" />
        <h3>Better hit another...</h3>
        <p>I don't think you're going to find that one.</p>
      </div>
    </div>
  )
}

export { NotFoundScreen }
