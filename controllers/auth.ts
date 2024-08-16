import { Request, Response } from "express"

export const register = (req: Request, res: Response) => {
  res.json({
    success: true,
  })
}
