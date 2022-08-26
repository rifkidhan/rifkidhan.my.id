import type { NextApiRequest, NextApiResponse } from 'next';
import { getDirectus } from '@libs/directus';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { collection } = req.body;
  const headers = req.headers;

  if (!headers['x-webhook-secret']) {
    return res.status(403).send('Forbidden');
  }

  const receivedSecret = headers['x-webhook-secret'];

  const secret = process.env.REVALIDATE;

  if (receivedSecret !== secret) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  if (collection === 'blog') {
    const { keys } = req.body;

    for (const key of keys) {
      const directus = await getDirectus();
      const response: any = await directus
        .items(collection)
        .readOne(key, { fields: ['slug'] });

      await Promise.all([
        res.revalidate(`/blog/${response.slug}`),
        res.revalidate('/')
      ]);
    }
  }
  return res.status(200).send('Success revalidating');
}
