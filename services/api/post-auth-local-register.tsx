import config from '../../config/config';
import { StrapiApiError } from '../../constants/strapi-api-error';

export type UserData = { email: string; username: string; password: string };

const postAuthLocalRegister = async (userData: UserData): Promise<UserResponse> => {
  const response = await fetch(`${config.apiHost}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) return Promise.reject(new StrapiApiError(data));
  return data;
};

export default postAuthLocalRegister;
