import { NextApiRequest, NextApiResponse } from 'next';
import config from '../../config/config';
const { parseCookies, setCookie, destroyCookie } = require('nookies');

enum StatusCodes {
  OK = 200,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      const response = await fetch(`${config.apiHost}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        body: JSON.stringify(req.body),
      });

      const data = await response.json();

      if (data.statusCode === StatusCodes.BAD_REQUEST) {
        res.status(data.statusCode).send({
          message: data.message[0].messages[0].message,
          error: data.error,
        });
        break;
      }

      setCookie({ res }, 'AuthToken', data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        domain:
          process.env.NODE_ENV === 'development'
            ? 'localhost'
            : process.env.NEXT_PUBLIC_API_HOST,
      });

      res.status(200).send(data.user);
      break;
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
