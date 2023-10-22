import { connect, ConnectionOptions, JetStreamClient, JetStreamManager } from 'nats'

import { logger } from '../logger'

class NatsStream {
	private static _instance: NatsStream = new NatsStream()
	private _manager?: JetStreamManager
	private _client?: JetStreamClient

	private constructor() {}

	static get instance() {
		return this._instance
	}

	get manager() {
		if (!this._manager) throw new Error('Can not access NATS Stream manager before connecting')
		return this._manager
	}

	get client() {
		if (!this._client) throw new Error('Can not access NATS Stream client before connecting')
		return this._client
	}

	async connect(opts: ConnectionOptions) {
		logger.info(`${logger.BRIGHT('Nats:')} Connecting`)
		const nats_connection = await connect(opts)
		logger.info(`${logger.BRIGHT('Nats:')} Connected`)
		this._manager = await nats_connection.jetstreamManager()
		this._client = nats_connection.jetstream()

		process.on('exit', async () => {
			logger.info(`${logger.BRIGHT('Nats:')} Closing`)
			await nats_connection.close()
			logger.info(`${logger.BRIGHT('Nats:')} Closed`)
		})
	}
}

const instance = NatsStream.instance
export { instance as nats_stream }
