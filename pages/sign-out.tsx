import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import DirectusError from '../constants/directus-error';
import STATIC_ROUTES from '../constants/routes';
import postAuthLogout from '../services/api/post-auth-logout';
import useAuthStore from '../store/auth';

const SignoutPage = () => {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const mutation = useMutation<AxiosResponse<null>, DirectusError>(postAuthLogout, {
    onSuccess: (_) => {
      setAccessToken('');
      setTimeout(() => router.push(STATIC_ROUTES.Home), 1000);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  return <div>Signing out</div>;
};

export default SignoutPage;
