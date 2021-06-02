import { AxiosInstanceFactory } from '../libs/axios-factory/axios-instance-factory';
import config from './config';

const authAPI = new AxiosInstanceFactory(`${config.apiLocal}/api/auth`).getInstance();

export default authAPI;
