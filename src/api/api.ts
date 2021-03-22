import axios, { AxiosResponse } from 'axios';

type Methods = 'get' | 'post';

export default class Api {
  public response: unknown;

  constructor(
    public method: Methods,
    public url: string,
    public payload: any,
    public options: any
  ) {}

  private generateRequest() {
    switch (this.method) {
      case 'get': {
        return axios[this.method](this.url);
      }
      case 'post': {
        return axios[this.method](this.url, this.payload, this.options);
      }
    }
  }

  public getResponse() {
    const sentRequest = async () => {
      try {
        this.response = await this.generateRequest();
      } catch (err) {
        this.response = new Error(err);
      }
      return this.response;
    };
    sentRequest();
  }
}
