import { Methods } from './paramsTypes';

interface Config {
  url: string;
  method: Methods;
  [key: string]: any;
}

type ErrorInfoFromServer = { data: { error: string } };

interface ServerError {
  config: Config;
  response: ErrorInfoFromServer;
  message: string;
}

interface NetworkError {
  config: Config;
  response: undefined;
  message: string;
}

//Define type of Error
function apiErrorType(error: ServerError | NetworkError): error is ServerError {
  return error.response !== undefined;
}

//Parse Error for storing info about it in Redux store
export default function parseApiError(error: any) {
  //if ServerError
  if (apiErrorType(error)) {
    const { config, response } = error;
    return {
      message: response.data.error,
      endpoint: config.url,
      method: config.method,
    };
  }
  //if NetworkError
  const { config, message } = error;
  return {
    message: message,
    endpoint: config.url,
    method: config.method,
  };
}
