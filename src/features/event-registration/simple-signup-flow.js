/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import { AlertDialogDescription, AlertDialogLabel } from "@reach/alert-dialog"

import React from "react"

import { ConfirmAlertDialog } from "components/confirm"
import { ErrorDisplay } from "components/errors"
import { Spinner } from "components/spinners"
import { RegistrationSteps, useEventRegistration } from "context/registration-context"
import { queryCache } from "react-query"
import * as colors from "styles/colors"

import EventRegistrationComplete from "./event-registration-complete"
import EventRegistrationConfirm from "./event-registration-confirm"
import EventRegistrationForm from "./event-registration-form"
import EventRegistrationPayment from "./event-registration-payment"

function SimpleSignupFlow(props) {
  const {
    error,
    registration,
    currentStep,
    cancelRegistration,
    updateStep,
  } = useEventRegistration()

  const [showConfirm, setShowConfirm] = React.useState(false)
  const [isBusy, setIsBusy] = React.useState(false)
  const cancelRef = React.useRef()

  const handleReset = () => {
    cancelRegistration(registration.id)
    window.location.assign(window.location)
  }

  const handleCancel = () => {
    setShowConfirm(false)
    cancelRegistration(registration.id)
    window.location.assign(window.location)
  }

  const handleRegistrationComplete = () => {
    queryCache.invalidateQueries("my-events")
    updateStep(RegistrationSteps.Complete)
  }

  return (
    <React.Fragment>
      {currentStep !== RegistrationSteps.Pending && (
        <React.Fragment>
          {error ? (
            <div className="card border border-danger">
              <div className="card-header text-white bg-danger">Registration Failure</div>
              <div className="card-body">
                <p>
                  An error occurred and we cannot continue the registration process. This may be
                  temporary. Click the Reset button to start over. If this problem persists, please
                  contact <a href="mailto:admin@bhmc.org">admin@bhmc.org</a>.
                </p>
                <ErrorDisplay error={error} isError={true} />
                <div className="row" style={{ marginTop: "1rem", textAlign: "right" }}>
                  <div className="col-12">
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: ".5rem" }}
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card border border-success">
              <div className="card-header bg-success">
                <span style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem" }}>
                  {currentStep.title}
                </span>
                {isBusy && (
                  <span>
                    <Spinner style={{ fontSize: "2rem", color: colors.white }} />
                  </span>
                )}
              </div>
              {currentStep === RegistrationSteps.Register && (
                <EventRegistrationForm
                  feeFilter={props.feeFilter}
                  getNotificationType={props.getNotificationType}
                  onBusy={(busy) => setIsBusy(busy)}
                  onCancel={setShowConfirm}
                  onComplete={() => updateStep(RegistrationSteps.Review)}
                />
              )}
              {currentStep === RegistrationSteps.Review && (
                <EventRegistrationConfirm
                  onBack={() => updateStep(RegistrationSteps.Register)}
                  onBusy={(busy) => setIsBusy(busy)}
                  onCancel={setShowConfirm}
                  onComplete={() => updateStep(RegistrationSteps.Payment)}
                />
              )}
              {currentStep === RegistrationSteps.Payment && (
                <EventRegistrationPayment
                  onBack={() => updateStep(RegistrationSteps.Review)}
                  onBusy={(busy) => setIsBusy(busy)}
                  onCancel={setShowConfirm}
                  onComplete={handleRegistrationComplete}
                />
              )}
              {currentStep === RegistrationSteps.Complete && <EventRegistrationComplete />}
            </div>
          )}
        </React.Fragment>
      )}
      {showConfirm && (
        <ConfirmAlertDialog leastDestructiveRef={cancelRef}>
          <AlertDialogLabel>
            <h4 className="text-primary">Please Confirm!</h4>
          </AlertDialogLabel>
          <AlertDialogDescription style={{ padding: "1rem 0" }}>
            <p>Are you sure you want to cancel your registration?</p>
          </AlertDialogDescription>
          <div style={{ textAlign: "center" }} className="alert-buttons">
            <button
              style={{ marginRight: ".5rem" }}
              className="btn btn-primary"
              onClick={handleCancel}
            >
              Yes
            </button>
            <button
              style={{ marginLeft: ".5rem" }}
              className="btn btn-light"
              ref={cancelRef}
              onClick={() => setShowConfirm(false)}
            >
              No
            </button>
          </div>
        </ConfirmAlertDialog>
      )}
    </React.Fragment>
  )
}

export default SimpleSignupFlow
