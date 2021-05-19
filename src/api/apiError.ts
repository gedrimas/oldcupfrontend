import { Methods } from './paramsTypes'

interface Config {
  url: string
  method: Methods
  [key: string]: any
}

type ErrorInfoFromServer = { data: { error: string } }

interface ServerError {
  config: Config
  response: ErrorInfoFromServer
  message: string
}

interface NetworkError {
  config: Config
  response: undefined
  message: string
}

//Define type of Error
function apiErrorType(error: ServerError | NetworkError): error is ServerError {
  return error.response !== undefined
}

export class GetSectionsError extends Error {
  constructor(message: string) {
    super()
    this.message = message
  }
}
