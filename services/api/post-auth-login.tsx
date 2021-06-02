import { AxiosResponse } from 'axios';
import authAPI from '../../config/auth-api';
import DirectusError from '../../constants/directus-error';
import {
  clientErrorResponse,
  serverErrorResponse,
  successfulResponse,
} from '../../libs/response-checker/response-checker';

const postAuthLogin = async (userData: UserDataRequest): Promise<AxiosResponse<LoginResponse>> => {
  try {
    const response = await authAPI.post('/login', userData);

    if (successfulResponse(response)) {
      return response;
    }
  } catch (error) {
    if (serverErrorResponse(error.response)) {
      return Promise.reject(new DirectusError(error.response.data.errors[0]));
    }
    if (clientErrorResponse(error.response)) {
      return Promise.reject(new DirectusError(error.response.data.errors[0]));
    }
  }
};

export default postAuthLogin;
