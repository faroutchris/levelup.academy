import axios, { AxiosInstance } from 'axios';

export class AxiosInstanceFactory {
  instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: 10000,
    });
  }

  /**
   * registerInterceptor
   * Supply instance with request and response interceptors for this instance to .use(...)
   * response.use(...) takes an onFulfilled and onRejected callback where the AxiosInstance is supplied as a param.
   * @param interceptors Interceptor[]
   * @returns AxiosInstanceFactory
   */
  registerInterceptor = (interceptors: Interceptor[]): AxiosInstanceFactory => {
    interceptors.forEach((interceptor) => {
      const { request, response } = this.instance.interceptors;

      interceptor.request ? request.use(interceptor.request) : null;

      interceptor.onFulfilled || interceptor.onRejected
        ? response.use(
            interceptor.onFulfilled
              ? (value) => interceptor.onFulfilled(this.instance, value)
              : null,
            interceptor.onRejected ? (error) => interceptor.onRejected(this.instance, error) : null
          )
        : null;
    });

    return this;
  };

  getInstance = (): AxiosInstance => {
    return this.instance;
  };
}
