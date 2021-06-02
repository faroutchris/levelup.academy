import { AxiosResponse } from 'axios';

export const successfulResponse = (response: AxiosResponse): boolean => {
  if (response && response.status) {
    return response.status >= 200 && response.status < 300;
  }
  return false;
};

export const clientErrorResponse = (response: AxiosResponse): boolean => {
  if (response && response.status) {
    return response.status >= 400 && response.status < 500;
  }
  return false;
};

export const serverErrorResponse = (response: AxiosResponse): boolean => {
  if (response && response.status) {
    return response.status >= 500 && response.status < 600;
  }
  return false;
};
