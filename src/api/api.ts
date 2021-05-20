import axios, { AxiosRequestConfig } from 'axios'
import { ResponsesTypes } from './responsesTypes'
import { Methods, Urls } from './paramsTypes'

type Response<U> = U extends ResponsesTypes ? U : never

export interface AxiosResponse<U extends ResponsesTypes> {
  data: Response<U>
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
}

export interface ApiError {
  message: string
  endpoint: string
  method: string
}

export function apiRespType<T extends ResponsesTypes>(
  response: AxiosResponse<T> | ApiError,
): response is AxiosResponse<T> {
  return (response as AxiosResponse<T>).status === 200
}

//Sends request and returns typed response in 'response' property or Error info
export default class Api<U extends ResponsesTypes> {
  constructor(
    public method: Methods,
    public url: Urls,
    public payload?: any,
    public options?: any,
  ) {}

  public sendRequest() {
    return (async () => {
      switch (this.method) {
        case 'get': {
          try {
            const response = await axios[this.method]<Response<U>>(
              `http://localhost:3001/${this.url}`,
            )
            return response
          } catch (error) {
            return {
              message: error.message,
              endpoint: this.url,
              method: this.method,
            }
          }
        }
        case 'post': {
          try {
            const response = await axios[this.method]<Response<U>>(
              `http://localhost:3001/${this.url}`,
              this.payload,
              this.options,
            )
            return response
          } catch (error) {
            return {
              message: error.message,
              endpoint: this.url,
              method: this.method,
              body: this.payload,
            }
          }
        }
      }
    })()
  }
}
