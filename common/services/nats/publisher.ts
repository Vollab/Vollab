import { Event } from 'common/types/events'
import { nats_stream } from './nats'
import { logger } from '../logger'

export abstract class Publisher<T extends Event> {
	abstract subject: T['subject']

	protected constructor() {}

	async publish(data: T['data']) {
		logger.debug(`${logger.YELLOW(this.subject)}: ${this.parseMessage(data)}`)
		return nats_stream.client.publish(this.subject, this.parseMessage(data))
	}

	private parseMessage(data: T['data']) {
		return Buffer.from(typeof data === 'object' ? JSON.stringify(data) : data, 'utf8')
	}
}
