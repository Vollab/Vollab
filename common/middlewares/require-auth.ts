import { Request, Response, NextFunction } from 'express'
import jwt, { TokenExpiredError } from 'jsonwebtoken'

import { AccessTokenPayload, UserType } from 'common/types/session-payload'
import { UnauthenticatedError, UnauthorizedError } from 'common/errors'

declare global {
	namespace Express {
		interface Request {
			current_user?: {
				user_id: string
			}
		}
	}
}

export const require_auth = (user_types: UserType[]) => (req: Request, res: Response, next: NextFunction) => {
	if (!req.cookies.session_access) throw new UnauthenticatedError('Access token not provided')

	try {
		const payload = jwt.verify(req.cookies.session_access, process.env.JWT_KEY!) as AccessTokenPayload
		if (!user_types.includes(payload.user_type)) throw new UnauthorizedError()
		req.current_user = payload
	} catch (error) {
		if (error instanceof TokenExpiredError) throw new UnauthenticatedError('Token expired')
		if (error instanceof UnauthorizedError) throw error
		else throw new UnauthenticatedError('Invalid token')
	}

	next()
}
