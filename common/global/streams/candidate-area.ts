import { Stores, Subjects } from 'common/types/events'
import { Stream } from 'common/services/nats'

class CandidateAreaStream extends Stream {
	private static _instance: CandidateAreaStream = new CandidateAreaStream()

	readonly name = Stores.CandidateArea
	readonly subjects = [Subjects.CandidateArea]

	static get instance() {
		return this._instance
	}
}

const instance = CandidateAreaStream.instance
export { instance as candidate_area_stream }
