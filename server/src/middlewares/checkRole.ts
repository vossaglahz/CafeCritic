import { RequestWithUser } from '@/interfaces/IRequest.interface';
import { NextFunction, Response } from 'express';

export function checkRole(...allowedRoles: string[]) {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && allowedRoles.includes(user.role)) {
      next();
    } else {
      res.status(403).send({ error: 'Permission denied' });
    }
  };
}