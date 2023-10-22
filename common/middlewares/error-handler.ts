import { Request, Response, NextFunction } from 'express'
import { CustomError } from 'common/errors/custom'
import { logger } from 'common/services'

export const error_handler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof CustomError) return res.status(err.status_code).json({ errors: err.serialize() })

	logger.error(err.stack)
	return res.status(500).json({ errors: { message: 'Something went wrong' } })
}
