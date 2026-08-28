import type { NextFunction, Request, Response } from "express"

export type AuthedRequest = Request & {
  session: Request["session"] & {
    isAdmin?: boolean
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const session = req.session as AuthedRequest["session"]
  if (!session?.isAdmin) {
    res.status(401).json({ error: "Wymagane logowanie." })
    return
  }
  next()
}

export function authStatus(req: Request, res: Response) {
  const session = req.session as AuthedRequest["session"]
  res.json({ authenticated: Boolean(session?.isAdmin) })
}
