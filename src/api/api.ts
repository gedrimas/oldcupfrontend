import axios, { AxiosRequestConfig } from 'axios';
import { ResponsesTypes } from './responsesTypes';
import { Methods, Urls } from './paramsTypes';

type Response<U> = U extends ResponsesTypes ? U : never;

export interface AxiosResponse<U extends ResponsesTypes> {
  data: Response<U>;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
}

//Sends request and returns typed response in 'response' property
export default class Api<U extends ResponsesTypes> {
  public response: Promise<AxiosResponse<U>>;

  constructor(
    public method: Methods,
    public url: Urls,
    public payload?: any,
    public options?: any
  ) {
    this.response = this.sentRequest();
  }

  private sentRequest() {
    return (() => {
      switch (this.method) {
        case 'get': {
          const response = axios[this.method]<Response<U>>(
            `http://localhost:3001/${this.url}`
          );
          return response;
        }
        case 'post': {
          const response = axios[this.method]<Response<U>>(
            this.url,
            this.payload,
            this.options
          );
          return response;
        }
      }
    })();
  }
}
