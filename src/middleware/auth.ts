import { NextFunction, Request, Response } from 'express';
import usersRepo from '../repo/Users';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).send({ error: 'Não autorizado' });
  }

  const token = authorization.split(' ')[1];

  const { id } = jwt.verify(token, process.env.JWT_PASS || '') as {
    id: string;
  };

  const user = await usersRepo.Read(id);

  if (!user) {
    return res.status(400).send({ error: 'Não autorizado' });
  }

  req.user = user.data;

  next();
};
