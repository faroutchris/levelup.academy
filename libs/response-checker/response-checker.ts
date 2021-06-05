import { AxiosResponse } from 'axios';

export const successful = (response: AxiosResponse): boolean => {
  if (response && response.status) {
    return response.status >= 200 && response.status < 300;
  }
  return false;
};

export const clientError = (response: AxiosResponse): boolean => {
  if (response && response.status) {
    return response.status >= 400 && response.status < 500;
  }
  return false;
};

export const serverError = (response: AxiosResponse): boolean => {
  if (response && response.status) {
    return response.status >= 500 && response.status < 600;
  }
  return false;
};
