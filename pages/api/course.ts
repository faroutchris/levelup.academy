import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  switch (req.method) {
    case 'GET':
      return res.status(200).json({});

    case 'POST':
      return res.status(200).json({});
  }
  res.status(200).json({ name: 'John Doe' });
};

export default handler;
