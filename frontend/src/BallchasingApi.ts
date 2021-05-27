import axios, { AxiosInstance } from "axios"

export default class BallChasingApi {
  instance: AxiosInstance

  public constructor() {
    this.instance = axios.create({
      baseURL: "https://localhost:44378/BallChasingApi/",
      timeout: 1000
    })
  }
}
