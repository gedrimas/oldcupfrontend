import axios, { AxiosResponse } from 'axios';
import ResponsesTypes, { Sections, Contacts } from './responsesTypes';
import { Methods, Urls } from './paramsTypes';

export default class Api {
  public response: Promise<AxiosResponse<Sections | Contacts> | Error>;

  constructor(
    public method: Methods,
    public url: Urls,
    public payload: any,
    public options: any
  ) {
    this.response = this.sentRequest();
  }

  private sentRequest() {
    return (async (url: Urls) => {
      switch (this.method) {
        case 'get': {
          try {
            const response = await axios[this.method]<
              ResponsesTypes[typeof url]
            >(this.url);
            return response;
          } catch (err) {
            return new Error(err);
          }
        }
        case 'post': {
          try {
            const response = await axios[this.method]<
              ResponsesTypes[typeof url]
            >(this.url, this.payload, this.options);
            return response;
          } catch (err) {
            return new Error(err);
          }
        }
        default:
          return new Error();
      }
    })(this.url);

    // switch (this.method) {
    //   case 'get': {
    //     //return axios[this.method]<ResponsesTypes[typeof url]>(this.url);
    //       const resp = axios[this.method]<ResponsesTypes[typeof url]>(this.url)
    //       return resp
    //   }
    //   case 'post': {
    //     const resp = axios[this.method](this.url, this.payload, this.options);
    //     return resp
    //   }
    // }
  }
}
