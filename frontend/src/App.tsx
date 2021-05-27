import React, { useEffect } from "react"
import "./App.css"
import styled from "styled-components"
// import { gapi } from "gapi-script"
import BallchasingApi from "./BallchasingApi"
import {
  BallChasingGroup,
  BallChasingGroupStats
} from "./models/BallChasingApiModels"
import { PlayerTrackerId } from "./models/PlayerTrackerId"
// import { Schedule } from "./models/Scheduling"

interface PassedProps {
  className?: string
  isDragAccept?: boolean
  isDragReject?: boolean
  isDragActive?: boolean
}

const trackerLinksSheetId = "1HLd_2yMGh_lX3adMLxQglWPIfRuiSiv587ABYnQX-0s"

const rawStatsGoogleSheet = "1y4abHsJrmkdQAGGNW7ZAVpnrL3lZVN5Eh4bnsxWfHlo"

const ballChasingApi = new BallchasingApi()

const App = (props: PassedProps) => {
  // const [schedule, setSchedule] = React.useState<Schedule[]>()

  const [playerTrackerIds, setPlayerTrackerIds] =
    React.useState<PlayerTrackerId[]>()

  const [ballChasingSeasonGroups, setBallChasingSeasonGroups] =
    React.useState<BallChasingGroup[]>()
  const [selectedSeasonGroup, setSelectedSeasonGroup] =
    React.useState<BallChasingGroup>()
  const [ballChasingLeagueGroups, setBallChasingLeagueGroups] =
    React.useState<BallChasingGroup[]>()
  const [selectedLeagueGroup, setSelectedLeagueGroup] =
    React.useState<BallChasingGroup>()
  const [ballChasingDayGroups, setBallChasingDayGroups] =
    React.useState<BallChasingGroup[]>()
  const [selectedDayGroup, setSelectedDayGroup] =
    React.useState<BallChasingGroup>()
  const [ballChasingTeamGroups, setBallChasingTeamGroups] =
    React.useState<BallChasingGroup[]>()

  // useEffect(() => {
  //   if (playerTrackerIds) {
  //     ballChasingApi.instance
  //       .get<BallChasingGroupStats>(`GetGroupById/test-99u4wfwt1u`) //TODO UN-HARDCODE THIS
  //       .then(function (response) {
  //         const playerStatValues = [[]]

  //         // handle success
  //         console.log("test group:")
  //         console.log(response.data)
  //         response.data.players?.forEach(player => {
  //           const foundPlayer = playerTrackerIds?.find(
  //             x => x.platformId?.toUpperCase() === player.id?.toUpperCase()
  //           )
  //           console.log(foundPlayer)
  //           // playerStatValues.push([foundPlayer?.RSCId, ])
  //         })

  //         const client = gapi.client as any

  //         client.sheets.spreadsheets.values
  //           .append({
  //             spreadsheetId: rawStatsGoogleSheet,
  //             majorDimension: "ROWS",
  //             range: "Sheet1",
  //             valueInputOption: "USER_ENTERED",
  //             values: [
  //               ["Door", "$15", "2", "3/15/2016"],
  //               ["Engine", "$100", "1", "3/20/2016"]
  //             ]
  //           })
  //           .then(
  //             function (response: any) {
  //               console.log("append response:")
  //               // console.log(response.result)
  //               console.log(response)
  //             },
  //             function (error: any) {
  //               console.log("Error: " + error.result.error.message)
  //             }
  //           )
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         console.log(error)
  //       })
  //       .then(function () {
  //         // always executed
  //       })
  //   }
  // }, [playerTrackerIds])

  useEffect(() => {
    ballChasingApi.instance
      .get<BallChasingGroup[]>(`GetGroupsByCreator/76561199096013422`) //this is the RSC steam
      .then(function (response) {
        // handle success
        const groupId = response.data.find(x => x.name === "RSC")?.id

        ballChasingApi.instance
          .get<BallChasingGroup[]>(`GetGroupsByParentGroup/${groupId}`)
          .then(function (response) {
            // handle success
            setBallChasingSeasonGroups(response.data)
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
          .then(function () {
            // always executed
          })
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }, [])

  useEffect(() => {
    const client = gapi.client as any

    client.sheets.spreadsheets.values
      .get({
        spreadsheetId: trackerLinksSheetId,
        range: "Link List"
      })
      .then(
        function (response: any) {
          const tempPlayerTrackerIds: PlayerTrackerId[] = []
          response.result.values.forEach((element: any) => {
            let trackerLink = element[2] as string

            let trackerPlatform = ""
            let trackerId = ""

            if (trackerLink.startsWith("http://")) {
              trackerLink = trackerLink.replace("http://", "https://") //just make them all https since it doesn't really matter
            }

            //some of the links include "rocket-league"
            if (trackerLink.includes("/rocket-league/")) {
              trackerLink = trackerLink.replace("/rocket-league", "")
            }

            if (trackerLink.includes("/xbl/")) {
              trackerLink = trackerLink.replace("/xbl", "/xbox") //not sure if there's a difference here?
            }

            if (trackerLink.includes("/ps/")) {
              trackerLink = trackerLink.replace("/ps/", "/psn/") //not sure if there's a difference here?
            }

            if (trackerLink.includes("steam")) {
              //steam
              trackerPlatform = "Steam"
              trackerId = trackerLink.split(
                "https://rocketleague.tracker.network/profile/steam/"
              )[1]
            } else if (trackerLink.includes("epic")) {
              //epic
              trackerPlatform = "Epic"
              //uri is in ASCII so we need to decode it
              trackerId = decodeURIComponent(trackerLink).split(
                "https://rocketleague.tracker.network/profile/epic/"
              )[1]
            } else if (trackerLink.includes("xbox")) {
              //xbox
              trackerPlatform = "Xbox"
              trackerId = trackerLink.split(
                "https://rocketleague.tracker.network/profile/xbox/"
              )[1]
            } else if (trackerLink.includes("switch")) {
              //xbox
              trackerPlatform = "Switch"
              trackerId = trackerLink.split(
                "https://rocketleague.tracker.network/profile/switch/"
              )[1]
            } else {
              trackerPlatform = "PS4"
              //playstation
              trackerId = trackerLink.split(
                "https://rocketleague.tracker.network/profile/psn/"
              )[1]
            }

            // if (!trackerId) {
            //   console.log(trackerLink)
            //   console.log(trackerId)
            // }

            //if the tracker id still contains /overview at the end, remove it
            if (trackerId && trackerId.includes("/")) {
              trackerId = trackerId.split("/")[0]
            }

            tempPlayerTrackerIds.push({
              RSCId: element[0],
              Name: element[1],
              TrackerLink: element[2],
              platform: trackerPlatform,
              platformId: trackerId
            })
          })

          setPlayerTrackerIds(tempPlayerTrackerIds)
        },
        function (error: any) {
          console.log("Error: " + error.result.error.message)
        }
      )
  }, [])

  // useEffect(() => {
  //   const client = gapi.client as any

  //   // client.sheets.spreadsheets
  //   //   .create({
  //   //     properties: {
  //   //       title: "testing?"
  //   //     }
  //   //   })
  //   //   .then((response: any) => {
  //   //     console.log(response)
  //   //   })

  //   client.sheets.spreadsheets.values
  //     .get({
  //       spreadsheetId: "1VNkCtlr1sZbalFjy9n_ANmimzlZ4IdnFkWClP7WcNII",
  //       range: "A1:B20"
  //     })
  //     .then(
  //       function (response: any) {
  //         // console.log(response.result)
  //         const tempSchedule: Schedule[] = []
  //         response.result.values.forEach((element: any, index: number) => {
  //           if (index !== 0) {
  //             tempSchedule.push({
  //               MatchDay: element[0],
  //               Date: element[1]
  //             })
  //           }
  //         })

  //         setSchedule(tempSchedule)
  //       },
  //       function (error: any) {
  //         console.log("Error: " + error.result.error.message)
  //       }
  //     )
  // }, [])

  return (
    <div className={props.className + " App"}>
      {/* <ReplayUpload /> */}
      <button onClick={onTestClick}>test stats upload</button>
      {selectedSeasonGroup && <div>Selected: {selectedSeasonGroup.name}</div>}
      {!selectedSeasonGroup && <div>Please select a season</div>}
      {!selectedSeasonGroup && ballChasingSeasonGroups && (
        <div>
          {ballChasingSeasonGroups.map(element => (
            <button
              onClick={() => onSeasonGroupClick(element)}
              key={"ballchasing-group-" + element.name}
            >
              {element.name}
            </button>
          ))}
        </div>
      )}
      {selectedLeagueGroup && <div>Selected: {selectedLeagueGroup.name}</div>}
      {!selectedLeagueGroup &&
        selectedSeasonGroup &&
        ballChasingLeagueGroups && <div>Please select a league</div>}
      {!selectedLeagueGroup && selectedSeasonGroup && ballChasingLeagueGroups && (
        <div>
          {ballChasingLeagueGroups.map(element => (
            <button
              onClick={() => onLeagueGroupClick(element)}
              key={"ballchasing-group-" + element.name}
            >
              {element.name}
            </button>
          ))}
        </div>
      )}
      {selectedDayGroup && <div>Selected: {selectedDayGroup.name}</div>}
      {!selectedDayGroup && selectedLeagueGroup && ballChasingDayGroups && (
        <div>Please select a day</div>
      )}
      {!selectedDayGroup && selectedLeagueGroup && ballChasingDayGroups && (
        <div>
          {ballChasingDayGroups.map(element => (
            <button
              onClick={() => onDayGroupClick(element)}
              key={"ballchasing-group-" + element.name}
            >
              {element.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  function onSeasonGroupClick(group: BallChasingGroup) {
    setSelectedSeasonGroup(group)

    ballChasingApi.instance
      .get<BallChasingGroup[]>(`GetGroupsByParentGroup/${group.id}`)
      .then(function (response) {
        // handle success
        setBallChasingLeagueGroups(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }

  function onLeagueGroupClick(group: BallChasingGroup) {
    setSelectedLeagueGroup(group)
    ballChasingApi.instance
      .get<BallChasingGroup[]>(`GetGroupsByParentGroup/${group.id}`)
      .then(function (response) {
        // handle success
        if (response.data.length == 1) {
          ballChasingApi.instance
            .get<BallChasingGroup[]>(
              `GetGroupsByParentGroup/${response.data[0].id}`
            )
            .then(function (response) {
              // handle success
              setBallChasingDayGroups(response.data)
            })
            .catch(function (error) {
              // handle error
              console.log(error)
            })
            .then(function () {
              // always executed
            })
        } else {
          setBallChasingDayGroups(response.data)
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }

  function onDayGroupClick(group: BallChasingGroup) {
    setSelectedDayGroup(group)
    ballChasingApi.instance
      .get<BallChasingGroup[]>(`GetGroupsByParentGroup/${group.id}`)
      .then(function (response) {
        // handle success
        setBallChasingTeamGroups(response.data)

        response.data.forEach(item =>
          ballChasingApi.instance
            .get(`GetGroupById/${item.id}`)
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              // handle error
              console.log(error)
            })
            .then(function () {
              // always executed
            })
        )
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }

  function onTestClick() {
    ballChasingApi.instance
      .get<BallChasingGroupStats>(`GetGroupById/test-99u4wfwt1u`) //TODO UN-HARDCODE THIS
      .then(function (response) {
        const playerStatValues: [(string | number)[]] = [[]]

        // handle success
        console.log("test group:")
        console.log(response.data)
        response.data.players?.forEach(player => {
          const foundPlayer = playerTrackerIds?.find(
            x => x.platformId?.toUpperCase() === player.id?.toUpperCase()
          )
          console.log(foundPlayer)
          playerStatValues.push([
            foundPlayer?.RSCId ?? "unknown player",
            "", //tier
            foundPlayer?.Name ?? "unknown player",
            "", //team
            "test day",
            player.cumulative.wins,
            player.cumulative.games - player.cumulative.wins,
            player.cumulative.core.mvp,
            player.cumulative.core.score
          ])
        })

        const client = gapi.client as any

        client.sheets.spreadsheets.values
          .append({
            spreadsheetId: rawStatsGoogleSheet,
            majorDimension: "ROWS",
            range: "Sheet1",
            valueInputOption: "USER_ENTERED",
            values: playerStatValues
          })
          .then(
            function (response: any) {
              console.log("append response:")
              // console.log(response.result)
              console.log(response)
            },
            function (error: any) {
              console.log("Error: " + error.result.error.message)
            }
          )
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

// export default App
/* border-color: ${props => getColor(props)}; */

export default styled(App)`
  margin: 25px;
`
