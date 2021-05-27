import React from "react"
// import { Replay } from "./parsing/replay"
import styled from "styled-components"
import Dropzone from "react-dropzone"
import { initParse } from "../parsing2/testParser"
import { PlayerStats } from "../models/PlayerStats"

interface PassedProps {
  className?: string
  isDragAccept?: boolean
  isDragReject?: boolean
  isDragActive?: boolean
}

const ReplayUpload = (props: PassedProps) => {
  const [playerStats, setPlayerStats] = React.useState<PlayerStats[]>()
  const [acceptedFiles, setAcceptedFiles] = React.useState<File[]>()

  return (
    <div className={props.className + " replay-upload"}>
      <Dropzone
        accept=".replay, .jpg"
        maxFiles={4}
        onDropAccepted={acceptedFiles => {
          setAcceptedFiles(acceptedFiles)
          initParse(acceptedFiles[0], setPlayerStats)
        }}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <section>
            <div
              className={"dropzonetest" + (isDragActive ? " drag-active" : "")}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p>Drag and drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      {acceptedFiles && <div>{acceptedFiles.map(file => file.name)}</div>}
      {playerStats && (
        <div>
          <div>Team 1</div>
          <table className="tablegoeshere">
            <tr>
              <th>Player Name</th>
              <th>Score</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Saves</th>
              <th>Shots</th>
            </tr>
            {playerStats
              .filter(x => x.Team === 0)
              .map(element => (
                <tr key={"player-stats-" + element.Name}>
                  <th>{element.Name}</th>
                  <th>{element.Score}</th>
                  <th>{element.Goals}</th>
                  <th>{element.Assists}</th>
                  <th>{element.Saves}</th>
                  <th>{element.Shots}</th>
                </tr>
              ))}
          </table>
          <div>Team 2</div>
          <table className="tablegoeshere">
            <tr>
              <th>Player Name</th>
              <th>Score</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Saves</th>
              <th>Shots</th>
            </tr>
            {playerStats
              .filter(x => x.Team === 1)
              .map(element => (
                <tr key={"player-stats-" + element.Name}>
                  <th>{element.Name}</th>
                  <th>{element.Score}</th>
                  <th>{element.Goals}</th>
                  <th>{element.Assists}</th>
                  <th>{element.Saves}</th>
                  <th>{element.Shots}</th>
                </tr>
              ))}
          </table>
        </div>
      )}
    </div>
  )
}

export default styled(ReplayUpload)`
  .dropzonetest {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
  }

  .drag-active {
    border-color: #2196f3 !important;
  }

  .tablegoeshere {
    width: 100%;
    height: 50%;
  }
`
