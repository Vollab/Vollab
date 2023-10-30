import { Stores, Subjects } from 'common/types/events'
import { Stream } from 'common/services/nats'

class CandidateStream extends Stream {
	private static _instance: CandidateStream = new CandidateStream()

	readonly name = Stores.Candidate
	readonly subjects = [Subjects.Candidate]

	static get instance() {
		return this._instance
	}
}

const instance = CandidateStream.instance
export { instance as candidate_stream }
