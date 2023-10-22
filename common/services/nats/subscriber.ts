import { JetStreamSubscription, JsMsg } from 'nats'

import { Event } from 'common/types/events'
import { Consumer } from './consumer'
import { nats_stream } from './nats'
import { logger } from '../logger'

export abstract class Subscriber<T extends Event> {
	protected abstract consumer: Consumer

	abstract subject: T['subject']
	abstract onMessage(msg: JsMsg): Promise<void>

	protected constructor() {}

	async subscribe() {
		await this.consumer.setup()
		const sub = await nats_stream.client.subscribe(this.subject, this.consumer.opts)
		this.messageHandler(sub)
	}

	private async messageHandler(sub: JetStreamSubscription) {
		for await (const msg of sub) {
			try {
				logger.debug(`${logger.GREEN(msg.subject)}: ${msg.data}`)
				await this.onMessage(msg)
			} catch (error) {
				logger.error(error)
			}
		}
	}

	protected parseMessage(data: Uint8Array): T['data'] {
		return JSON.parse(Buffer.from(data).toString('utf-8'))
	}
}
