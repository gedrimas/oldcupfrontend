import axios, { AxiosRequestConfig } from 'axios';
import ResponsesTypes, { Sections, Contacts } from './responsesTypes';
import { Methods, Urls } from './paramsTypes';

type Response<U extends 'allsections' | 'contacts'> = Pick<
  ResponsesTypes<Sections | Contacts>,
  U
>;

export interface AxiosResponse<U extends Urls> {
  data: Response<U>;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
}

export default class Api<U extends Urls> {
  public response: Error | Promise<AxiosResponse<U>>;

  constructor(
    public method: Methods,
    public url: Urls,
    public payload?: any,
    public options?: any
  ) {
    this.response = this.sentRequest();
  }

  private sentRequest() {
    return ((url: Urls) => {
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
        default:
          return new Error();
      }
    })(this.url);
  }
}
