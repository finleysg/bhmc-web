import React from "react"

import { useClient } from "context/auth-context"
import { ContactForm } from "features/forms/contact-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function SendMessagePage() {
  const client = useClient()
  const navigate = useNavigate()

  const sendMessage = (form) => {
    return client("contact", { data: form }).then(() => {
      toast.success("📫 Your message has been sent.")
      navigate("/contact-us")
    })
  }

  return (
    <div className="content__inner">
      {/* <header className="content__title">
        <h1>Send Us a Message</h1>
      </header> */}
      <div className="row">
        <div className="col-lg-6 col-md-8 col-sm-10 col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Send Us a Message</h4>
              <div className="card-text">
                <ContactForm onSubmit={sendMessage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendMessagePage
