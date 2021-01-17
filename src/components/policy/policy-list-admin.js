import React from "react"

import { FullPageSpinner } from "components/spinners"
import { useClient } from "context/auth-context"
import { IconContext } from "react-icons"
import { MdAddCircleOutline, MdFileUpload } from "react-icons/md"
import { queryCache, useMutation, useQuery } from "react-query"
import * as colors from "styles/colors"

import { ViewPolicy } from "./policy-detail"

function Actions(props) {
  const { onCreate, onUpload } = props
  return (
    <IconContext.Provider value={{ color: colors.yellow }}>
      <div className="actions">
        <button onClick={onCreate} className={`actions__item bg-transparent`}>
          <i>
            <MdAddCircleOutline />
          </i>
        </button>
        <button onClick={onUpload} className={`actions__item bg-transparent`}>
          <i>
            <MdFileUpload />
          </i>
        </button>
      </div>
    </IconContext.Provider>
  )
}

function PolicyListAdmin() {
  const client = useClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: "policies",
    queryFn: () =>
      client("api/policies/").then((data) => {
        return data
      }),
  })

  const [create] = useMutation((policy) => client(`api/policies/`, { data: { ...policy } }), {
    onSettled: () => queryCache.invalidateQueries("policies"),
  })

  const handleCreate = () => {
    // TODO: pick up the current policy type from the tab
    const newPolicy = {
      policy_type: "P",
      title: "Enter a Title",
      description: "Write your description",
    }
    create(newPolicy)
  }

  return (
    <div>
      <header className="content__title">
        <h1>Club Policies</h1>
        {/* <small>{{ pageSubTitle }}</small> */}
        <Actions onUpload={() => alert("upload a document")} onCreate={handleCreate} />
      </header>
      {isLoading ? (
        <FullPageSpinner />
      ) : isError ? (
        <div>
          <h4>There was a problem loading the club policies</h4>
          <pre style={{ color: "red" }}>{error}</pre>
        </div>
      ) : (
        data?.map((policy) => {
          return <ViewPolicy key={policy.id} policy={policy} />
        })
      )}
    </div>
  )
}

export default PolicyListAdmin
