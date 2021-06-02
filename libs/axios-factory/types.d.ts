declare interface Interceptor {
  request?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  onFulfilled?: (
    instance: AxiosInstance,
    value: AxiosResponse<any>
  ) => AxiosResponse<any> | Promise<AxiosResponse<any>>;
  onRejected?: (instance: AxiosInstance, error: any) => any;
}
