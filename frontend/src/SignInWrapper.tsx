import React, { useEffect } from "react"
import "./App.css"
import styled from "styled-components"
import { gapi } from "gapi-script"
import App from "./App"

interface PassedProps {
  className?: string
}

let done = false

const CLIENT_ID =
  "4165028778-f4urno332m7tg92t5c9s92ao0hmcr9qn.apps.googleusercontent.com"

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4"
]

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/drive"

const initClient = () => {
  if (done) {
    return
  }
  done = true
  gapi.client
    .init({
      apiKey: process.env.REACT_APP_GAPI_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })
    .then((test: any) => {
      // Listen for sign-in state changes.
      console.log("gapi.auth2", gapi.auth2)

      // gapi.auth2
      //   .getAuthInstance()
      //   .isSignedIn.listen(options.updateLoggedInStatus)

      // // Handle the initial sign-in state.
      // options.updateLoggedInStatus(
      //   gapi.auth2.getAuthInstance().isSignedIn.get()
      // )
    })
    .catch((err: any) => {
      console.error("Caught error", err)
    })
}

const SignInWrapper = (props: PassedProps) => {
  const [isSignedIntoGapi, setIsSignedIntoGapi] = React.useState<boolean>()

  const [initiatedClient, setInitiatedClient] = React.useState<boolean>(false)

  useEffect(() => {
    gapi.load("client:auth2", () => initClient())

    setInitiatedClient(true)
  }, [])

  return (
    <div className={props.className + " App"}>
      {!isSignedIntoGapi && initiatedClient && (
        <button onClick={onSignInClick}>Sign in</button>
      )}
      {isSignedIntoGapi && <App />}
    </div>
  )

  function onSignInClick() {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(function (response) {
        // handle success
        setIsSignedIntoGapi(true)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }
}

export default styled(SignInWrapper)``
