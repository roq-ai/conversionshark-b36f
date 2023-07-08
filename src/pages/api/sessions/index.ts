import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { sessionValidationSchema } from 'validationSchema/sessions';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getSessions();
    case 'POST':
      return createSession();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSessions() {
    const data = await prisma.session
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'session'));
    return res.status(200).json(data);
  }

  async function createSession() {
    await sessionValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.session.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
