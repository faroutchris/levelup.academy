declare interface Interceptor {
  request?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  onFulfilled?: (
    instance: AxiosInstance & { setConfig?(configSetter: any): void },
    value: AxiosResponse<any>
  ) => AxiosResponse<any> | Promise<AxiosResponse<any>>;
  onRejected?: (instance: AxiosInstance, error: AxiosError) => any;
}
