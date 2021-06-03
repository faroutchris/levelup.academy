import { AxiosError, AxiosInstance } from 'axios';
import NetworkConnectionError from '../../constants/network-error';

export default class NetworkInterceptor implements Interceptor {
  onRejected = async (_: AxiosInstance, error: AxiosError): Promise<any> => {
    const requestTimout = error.code === 'ECONNABORTED';
    const noInternet = error.message === 'Network Error';

    if (requestTimout) {
      return Promise.reject(new NetworkConnectionError('Timeout'));
    }

    if (noInternet) {
      return Promise.reject(new NetworkConnectionError('Network error'));
    }

    return Promise.reject(error);
  };
}
