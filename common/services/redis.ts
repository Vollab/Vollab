import { createClient, RedisClientOptions } from 'redis'

import { logger } from 'common/services'

class Redis {
	private static _instance = new Redis()
	private _client?: ReturnType<typeof createClient>

	private constructor() {}

	static get instance() {
		return Redis._instance
	}

	get client() {
		if (!this._client) throw new Error('Can not access Redis before connecting')
		return this._client
	}

	async connect(opts: RedisClientOptions) {
		this._client = createClient(opts)

		logger.info(`${logger.BRIGHT('Redis:')} Connecting`)
		await this._client.connect()
		logger.info(`${logger.BRIGHT('Redis:')} Connected`)

		process.on('exit', async () => {
			logger.info(`${logger.BRIGHT('Redis:')} Closing`)
			await this._client?.quit()
			logger.info(`${logger.BRIGHT('Redis:')} Closed`)
		})
	}
}

const instance = Redis.instance
export { instance as redis }
