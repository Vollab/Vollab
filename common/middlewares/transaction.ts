import { Request, Response, NextFunction } from 'express'

import { database } from 'common/services'

export const transaction = async (req: Request, res: Response, next: NextFunction) => {
	await database.beginTxn()
	next()
	res.on('finish', async () => (res.statusCode >= 400 ? await database.rollbackTxn() : await database.commitTxn()))
}
