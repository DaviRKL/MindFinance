import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authMiddleware = (req: Request, res: Response, next: NextFunction): Response | void =>  {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    (req as any).userId = decoded.userId
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
