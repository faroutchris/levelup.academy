import { NextApiRequest, NextApiResponse } from 'next';
import config from '../../../config/config';
import { setCookie } from 'nookies';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      const { body }: { body: { email: string; password: string } } = req;

      const loginBody = { ...body, mode: 'json' };

      try {
        const login = await fetch(`${config.apiHost}/auth/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache',
          body: JSON.stringify(loginBody),
        });

        const loginData = await login.json();

        if (!login.ok) {
          res.status(login.status).send(loginData);
          break;
        }

        const accessToken = loginData.data.access_token;
        const refreshToken = loginData.data.refresh_token;

        setCookie({ res }, 'directus_refresh_token', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production' ? true : false,
          sameSite: 'Lax',
          path: '/',
          maxAge: 604800,
          domain:
            process.env.NODE_ENV === 'development' ? 'localhost' : process.env.NEXT_PUBLIC_API_HOST,
        });

        res.status(200).send({ accessToken });
        break;
      } catch (error) {
        res.status(500).send({
          errors: [
            {
              message: 'Something went wrong',
              extensions: {
                code: 'INTERNAL_SERVER_ERROR',
              },
            },
          ],
        });
        break;
      }
    }
    default:
      res.status(405).send({
        message: 'Method not allowed',
        error: 'Http.Method.Not.Allowed',
      });
      break;
  }
};

export default handler;
