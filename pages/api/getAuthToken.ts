// pages/api/getAuthToken.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = cookies().get('userAuth') || null;
  res.status(200).json({ token });
}