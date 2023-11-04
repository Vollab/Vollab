import { candidate_area_stream } from 'common/global/streams'
import { Consumer } from 'common/services/nats'
import { Subjects } from 'common/types/events'

class CandidateAreaDeletedConsumer extends Consumer {
	private static _instance: CandidateAreaDeletedConsumer = new CandidateAreaDeletedConsumer()

	protected stream = candidate_area_stream
	readonly subject = Subjects.CandidateAreaDeleted
	readonly durable_name = 'CandidateAreaDeleted'
	readonly queue_group = 'queue'

	static get instance() {
		return this._instance
	}
}

const instance = CandidateAreaDeletedConsumer.instance
export { instance as candidate_area_deleted_consumer }
