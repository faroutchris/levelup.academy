import { AxiosInstanceFactory } from '../libs/axios-factory/axios-instance-factory';
import NetworkInterceptor from '../libs/axios-factory/network-interceptor';
import config from './config';

const authAPI = new AxiosInstanceFactory(`${config.apiLocal}/api/auth`)
  .registerInterceptor([new NetworkInterceptor()])
  .getInstance();

export default authAPI;
