import { NextApiRequest, NextApiResponse } from 'next';
import config from '../../../config/config';
import { parseCookies, setCookie } from 'nookies';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      const cookie = parseCookies({ req });

      try {
        const response = await fetch(`${config.apiHost}/auth/refresh/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh_token: cookie.directus_refresh_token,
          }),
          cache: 'no-cache',
        });

        const responseData = await response.json();

        if (!response.ok) {
          res.status(response.status).send(responseData);
          break;
        }

        const accessToken = responseData.data.access_token;
        const refreshToken = responseData.data.refresh_token;

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
