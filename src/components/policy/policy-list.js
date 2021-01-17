import React from "react"

import { FullPageSpinner } from "components/spinners"
import { Tab, Tabs } from "components/tabs"
import { useParams } from "react-router-dom"

import { PolicyDetail } from "./policy-detail"
import { usePolicies } from "./use-policies"

const policyCode = (policyType) => {
  switch (policyType) {
    case "policies-and-procedures":
      return "P"
    case "local-rules":
      return "R"
    case "scoring-and-handicaps":
      return "S"
    case "new-member-faqs":
      return "N"
    case "payment-faqs":
      return "F"
    default:
      return "P"
  }
}

function PolicyList() {
  const { policyType } = useParams()
  const { policies, isLoading, isError, error } = usePolicies()

  const filteredPolicies = () => {
    return policies
      .filter((p) => p.policy_type === policyCode(policyType))
      .map((policy) => {
        return <PolicyDetail key={policy.id} policy={policy} />
      })
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <FullPageSpinner />
      ) : isError ? (
        <div>
          <h4>There was a problem loading the club policies</h4>
          <pre style={{ color: "red" }}>{error}</pre>
        </div>
      ) : (
        <div>
          <Tabs>
            <Tab to="/policies/policies-and-procedures">Policies & Procedures</Tab>
            <Tab to="/policies/local-rules">Local Rules</Tab>
            <Tab to="/policies/scoring-and-handicaps">Scoring & Handicaps</Tab>
            <Tab to="/policies/payment-faqs">Online Payment FAQs</Tab>
            <Tab to="/policies/new-member-faqs">New Member FAQs</Tab>
          </Tabs>
          {filteredPolicies()}
        </div>
      )}
    </React.Fragment>
  )
}

export default PolicyList
