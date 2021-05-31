import config from '../../config/config';
import StrapiApiError from '../../constants/strapi-api-error';

export type UserDataSignIn = { identifier: string; password: string };

const postAuthLocal = async (userData: UserDataSignIn): Promise<UserResponse> => {
  const response = await fetch(`${config.apiHost}/auth/local`, {
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

export default postAuthLocal;
