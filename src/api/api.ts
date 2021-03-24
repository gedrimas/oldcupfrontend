import axios, { AxiosRequestConfig } from 'axios';
//import ResponsesTypes, { Sections, Contacts } from './responsesTypes';
import { Sections, Contacts, ResponsesTypes } from './responsesTypes';

import { Methods, Urls } from './paramsTypes';

//type Response<U extends Urls> = Pick<ResponsesTypes<Sections | Contacts>, U>;
type Response<U> = U extends ResponsesTypes ? U : never;

export interface AxiosResponse<U extends ResponsesTypes> {
  data: Response<U>;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
}

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
