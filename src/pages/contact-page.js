import React from "react"

import { CardContent } from "components/content"
import { Link } from "react-router-dom"

function ContactPage() {
  return (
    <div className="content__inner">
      <header className="content__title">
        <h1>Contact Information</h1>
        <Link
          to="message"
          className="btn btn-sm btn-success"
          style={{ float: "right", marginTop: "-20px" }}
        >
          Send Us a Message
        </Link>
      </header>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-12">
          <CardContent contentKey="contact-officers" />
        </div>
        <div className="col-lg-3 col-md-6 col-12">
          <CardContent contentKey="contact-directors" />
        </div>
        <div className="col-lg-3 col-md-6 col-12">
          <CardContent contentKey="contact-committees" />
        </div>
        <div className="col-lg-3 col-md-6 col-12">
          <CardContent contentKey="contact-staff" />
        </div>
      </div>
    </div>
  )
}

export default ContactPage
