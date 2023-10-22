import { AckPolicy, ConsumerConfig, consumerOpts, ConsumerOptsBuilder, createInbox, DeliverPolicy, ReplayPolicy } from 'nats'

import { Subjects } from 'common/types/events'
import { nats_stream } from './nats'
import { logger } from '../logger'
import { Stream } from './stream'

export interface Consumer {
	queue_group?: string
}

export abstract class Consumer {
	private _opts?: ConsumerOptsBuilder

	protected ack_await: number = 5 * 10 ** 9

	readonly inbox: string = createInbox()

	protected abstract stream: Stream

	abstract readonly subject: Subjects
	abstract readonly durable_name: string // ? Use subject name

	protected constructor() {}

	get opts() {
		if (!this._opts) throw new Error('Cannot access opts before setting up Consumer')
		return this._opts
	}

	async setup() {
		const config: Partial<ConsumerConfig> = {
			durable_name: this.durable_name,
			deliver_group: this.queue_group, // ! something wrong is happening with this config
			deliver_subject: this.inbox,
			deliver_policy: DeliverPolicy.All,
			filter_subject: this.subject,
			replay_policy: ReplayPolicy.Instant,
			ack_policy: AckPolicy.Explicit,
			ack_wait: this.ack_await
		}

		try {
			await this.stream.setup()
			await nats_stream.manager.consumers.info(this.stream.name, this.durable_name)
		} catch (error) {
			logger.info(`${logger.BRIGHT('Consumer:')} Creating ${this.subject}`)
			await nats_stream.manager.consumers.add(this.stream.name, config)
			logger.info(`${logger.BRIGHT('Consumer:')} Created ${this.subject}`)
		}

		this._opts = consumerOpts(config).manualAck()
		this.queue_group && this._opts.deliverGroup(this.queue_group) // ! need to config groups this way otherwise doesnt work
	}
}
