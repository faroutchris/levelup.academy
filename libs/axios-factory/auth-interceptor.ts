import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import authAPI from '../../config/auth-api';
import useAuthStore from '../../store/auth';

export default class AuthInterceptor implements Interceptor {
  request = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const { accessToken } = useAuthStore.getState();

    const accessToken2 = window !== undefined && window.localStorage.getItem('AccessToken'); // useAuthStore.getState();

    console.log('-->', accessToken);
    console.log('2', accessToken2);

    if (accessToken) {
      return {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${accessToken}` },
      };
    } else {
      return config;
    }
  };

  onRejected = async (instance: AxiosInstance, error: AxiosError): Promise<any> => {
    const { response, config } = error;
    const { setAccessToken } = useAuthStore.getState();

    console.log('-->', setAccessToken);

    if (response.status === 401) {
      try {
        const refreshResponse: AxiosResponse<LoginResponse> = await authAPI.post('/refresh');

        const accessToken = refreshResponse.data.accessToken;

        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        setAccessToken(accessToken);

        return new Promise((resolve) => resolve(instance(config)));
      } catch (_) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  };
}
