import { AxiosResponse } from 'axios';
import authAPI from '../../config/auth-api';
import DirectusError from '../../constants/directus-error';
import { clientError, serverError, successful } from '../../libs/response-checker/response-checker';

const postAuthLogin = async (userData: UserDataRequest): Promise<AxiosResponse<LoginResponse>> => {
  try {
    const response = await authAPI.post('/login', userData);

    if (successful(response)) {
      return response;
    }
  } catch (error) {
    if (serverError(error.response)) {
      return Promise.reject(new DirectusError(error.response.data.errors[0]));
    }
    if (clientError(error.response)) {
      return Promise.reject(new DirectusError(error.response.data.errors[0]));
    }
  }
};

export default postAuthLogin;
