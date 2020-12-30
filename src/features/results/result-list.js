// import React from "react"

// import { FullPageSpinner, LoadingSpinner } from "components/spinners"
// import { Tab, Tabs } from "components/tabs"
// import { useParams } from "react-router-dom"
// import { ErrorDisplay } from "components/errors"

// const resultCode = (eventType) => {
//   switch (eventType) {
//     case "policies-and-procedures":
//       return "P"
//     case "local-rules":
//       return "R"
//     case "scoring-and-handicaps":
//       return "S"
//     case "new-member-faqs":
//       return "N"
//     case "payment-faqs":
//       return "F"
//     default:
//       return "P"
//   }
// }

// function ResultList() {
//   const { eventType } = useParams()
// //   const { policies, isLoading, isError, error } = usePolicies()

//   const filteredResults = () => {
//     return policies
//       .filter((p) => p.result_type === resultCode(resultType))
//       .map((result) => {
//         return null
//       })
//   }

//   return (
//     <React.Fragment>
//         <LoadingSpinner loading={isLoading} />
//         <ErrorDisplay error={error} hasError={isError} />
//         <div>
//           <Tabs>
//             <Tab to="/results/weeknight-events">Weeknight Events</Tab>
//             <Tab to="/results/weekend-majors">Weekend Majors</Tab>
//             <Tab to="/results/other">Other Events</Tab>
//           </Tabs>
//           {filteredResults()}
//           </div>
//     </React.Fragment>
//   )
// }

// export default ResultList
