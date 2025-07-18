import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
  }
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Access token required" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    }
    next()
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" })
  }
}
