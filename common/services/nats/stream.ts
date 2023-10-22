import { DiscardPolicy, RetentionPolicy, StorageType, StreamConfig } from 'nats'

import { Stores, Subjects } from 'common/types/events'
import { nats_stream } from './nats'
import { logger } from '../logger'

export abstract class Stream {
	abstract readonly name: Stores
	abstract readonly subjects: Subjects[]

	protected constructor() {}

	async setup() {
		const config: Partial<StreamConfig> = {
			name: this.name,
			subjects: this.subjects,
			num_replicas: 1,
			max_age: 0,
			max_msgs: -1,
			max_bytes: -1,
			max_msg_size: -1,
			max_consumers: -1,
			max_msgs_per_subject: -1,
			retention: RetentionPolicy.Limits,
			discard: DiscardPolicy.Old,
			storage: StorageType.File,
			sealed: false,
			deny_purge: true,
			deny_delete: true,
			allow_rollup_hdrs: false,
			duplicate_window: 2 * 60 * 10 ** 9
		}

		try {
			await nats_stream.manager.streams.info(this.name)
			await nats_stream.manager.streams.update(this.name, config)
		} catch (error) {
			logger.info(`${logger.BRIGHT('Stream:')} Creating ${this.name}`)
			await nats_stream.manager.streams.add(config)
			logger.info(`${logger.BRIGHT('Stream:')} Created ${this.name}`)
		}
	}
}
