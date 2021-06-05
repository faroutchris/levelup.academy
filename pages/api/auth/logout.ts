import { NextApiRequest, NextApiResponse } from 'next';
import config from '../../../config/config';
import { parseCookies, setCookie } from 'nookies';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      try {
        setCookie({ res }, 'directus_refresh_token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production' ? true : false,
          sameSite: 'Lax',
          path: '/',
          expires: new Date(1),
          domain:
            process.env.NODE_ENV === 'development' ? 'localhost' : process.env.NEXT_PUBLIC_API_HOST,
        });

        res.status(204).send(null);
        break;
      } catch (error) {
        console.log(error.response);
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
