import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import authAPI from '../../config/auth-api';

export default class AuthInterceptor implements Interceptor {
  accessToken: string;

  request = (config: AxiosRequestConfig): AxiosRequestConfig => {
    // if accessToken
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${this.accessToken}`,
    };
    // else
    // use authService (TODO) to get one
    // if ok -> continue
    // if failure, send error message / route to start page
    return config;
  };

  onRejected = async (instance: AxiosInstance, error): Promise<any> => {
    const { response, config } = error;

    if (response.status === 401) {
      try {
        const refreshResponse: AxiosResponse<LoginResponse> = await authAPI.post('/refresh');

        this.accessToken = refreshResponse.data.accessToken;

        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${this.accessToken}`,
        };

        window.localStorage
          ? window.localStorage.setItem('AccessToken', this.accessToken)
          : () => {
              /* no op */
            };

        return new Promise((resolve) => resolve(instance(config)));
      } catch (_) {
        alert('You have been logged out');
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  };
}
