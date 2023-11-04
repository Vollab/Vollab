import { candidate_area_stream } from 'common/global/streams'
import { Consumer } from 'common/services/nats'
import { Subjects } from 'common/types/events'

class CandidateAreaCreatedConsumer extends Consumer {
	private static _instance: CandidateAreaCreatedConsumer = new CandidateAreaCreatedConsumer()

	protected stream = candidate_area_stream
	readonly subject = Subjects.CandidateAreaCreated
	readonly durable_name = 'CandidateAreaCreated'
	readonly queue_group = 'queue'

	static get instance() {
		return this._instance
	}
}

const instance = CandidateAreaCreatedConsumer.instance
export { instance as candidate_area_created_consumer }
