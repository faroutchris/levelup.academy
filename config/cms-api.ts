import AuthInterceptor from '../libs/axios-factory/auth-interceptor';
import { AxiosInstanceFactory } from '../libs/axios-factory/axios-instance-factory';
import NetworkInterceptor from '../libs/axios-factory/network-interceptor';
import config from './config';

const cmsAPI = new AxiosInstanceFactory(config.apiHost)
  .registerInterceptor([new NetworkInterceptor(), new AuthInterceptor()])
  .getInstance();

export default cmsAPI;
