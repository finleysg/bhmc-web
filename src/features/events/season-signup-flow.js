/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import { AlertDialogDescription, AlertDialogLabel } from "@reach/alert-dialog"

import React from "react"

import { ConfirmAlertDialog } from "components/confirm"
import { ErrorDisplay } from "components/errors"
import { Spinner } from "components/spinners"
import { useEventRegistration } from "context/registration-context"
import * as colors from "styles/colors"
import * as config from "utils/app-config"

import EventRegistrationComplete from "./event-registration-complete"
import EventRegistrationConfirm from "./event-registration-confirm"
import EventRegistrationForm from "./event-registration-form"
import EventRegistrationPayment from "./event-registration-payment"
import SeasonEvent from "./season-event"

const registrationSteps = {
  pending: {
    name: "pending",
  },
  register: {
    name: "register",
    title: "Online Registration (1 of 3)",
  },
  review: {
    name: "review",
    title: "Confirm Registration Details (2 of 3)",
  },
  payment: {
    name: "payment",
    title: "Submit Payment (3 of 3)",
  },
  complete: {
    name: "complete",
    title: "Registration Complete",
  },
}

function SeasonSignupFlow() {
  const [currentStep, changeCurrentStep] = React.useState(registrationSteps.pending)
  const {
    error,
    isFetching,
    registration,
    loadEvent,
    createRegistration,
    cancelRegistration,
  } = useEventRegistration()

  const [showConfirm, setShowConfirm] = React.useState(false)
  const cancelRef = React.useRef()

  React.useEffect(() => {
    loadEvent(config.seasonEventId)
  }, [loadEvent])

  const handleCancel = () => {
    setShowConfirm(false)
    cancelRegistration(registration.id).then(changeCurrentStep(registrationSteps.pending))
  }

  const handleStart = () => {
    if (registration && registration.id) {
      changeCurrentStep(registrationSteps.register)
    } else {
      const reg = {
        slots: [],
      }
      createRegistration(reg).then(changeCurrentStep(registrationSteps.register))
    }
  }

  const handleChangeStep = (nextStep) => {
    changeCurrentStep(nextStep)
  }

  return (
    <div className="content__inner">
      <header className="content__title">
        <h1>{config.currentSeason} Season Registration</h1>
      </header>
      <div className="row">
        <div className="col-lg-6">
          <SeasonEvent canStart={currentStep === registrationSteps.pending} onStart={handleStart} />
        </div>
        {currentStep !== registrationSteps.pending && (
          <div className="col-lg-6">
            {error && (
              <div className="card border border-danger">
                <div className="card-header text-white bg-danger">Registration Failure</div>
                <div className="card-body">
                  <ErrorDisplay error={error} isError={true} />
                </div>
              </div>
            )}
            <div className="card border border-success">
              <div className="card-header bg-success">
                <span style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem" }}>
                  {currentStep.title}
                </span>
                {isFetching > 0 && (
                  <span>
                    <Spinner style={{ fontSize: "2rem", color: colors.white }} />
                  </span>
                )}
              </div>
              {currentStep === registrationSteps.register && (
                <EventRegistrationForm
                  onCancel={setShowConfirm}
                  onReview={() => handleChangeStep(registrationSteps.review)}
                />
              )}
              {currentStep === registrationSteps.review && (
                <EventRegistrationConfirm
                  onBack={() => handleChangeStep(registrationSteps.register)}
                  onCancel={setShowConfirm}
                  onConfirm={() => handleChangeStep(registrationSteps.payment)}
                />
              )}
              {currentStep === registrationSteps.payment && (
                <EventRegistrationPayment
                  onBack={() => handleChangeStep(registrationSteps.review)}
                  onCancel={setShowConfirm}
                  onPaymentComplete={() => handleChangeStep(registrationSteps.complete)}
                />
              )}
              {currentStep === registrationSteps.complete && <EventRegistrationComplete />}
            </div>
          </div>
        )}
      </div>
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
    </div>
  )
}

export default SeasonSignupFlow
